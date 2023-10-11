import { v4 as uuidv4 } from 'uuid';
import type { Bookmark, State } from './interfaces';

async function getState(): Promise<State> {
  return {
    bookmarks: await getBookmarks(),
  };
}

async function getBookmarks(): Promise<Bookmark[]> {
  function createBookmarkFromBookmarkTree(
    tree: chrome.bookmarks.BookmarkTreeNode[]
  ): Bookmark[] {
    const bookmark: Bookmark[] = [...tree]
      .sort((n1, n2) => (n1.index ?? 0) - (n2.index ?? 0))
      .map((n) => ({
        index: n.index ?? 0,
        url: n.url,
        title: n.title,
        id: n.id ?? uuidv4(),
        parentId: n.parentId,
        children:
          n.children !== undefined
            ? createBookmarkFromBookmarkTree(n.children)
            : undefined,
      }));

    return bookmark;
  }
  const tree = await chrome.bookmarks.getTree();
  return createBookmarkFromBookmarkTree(tree[0].children ?? []);
}

async function sendState(): Promise<void> {
  const state = await getState();
  await chrome.runtime.sendMessage({
    type: 'newState',
    state,
    bookmarkSelectedTabId: state.bookmarks[0]?.id,
  });
}

chrome.runtime.onMessage.addListener((message) => {
  void (async (message) => {
    switch (message.type) {
      case 'getState':
        await sendState();
        break;
      case 'setBookmarkTabSelectionId':
        await chrome.runtime.sendMessage({
          type: 'newBookmarkTabSelectionId',
          tabId: message.tabId,
        });
    }
  })(message);
});
