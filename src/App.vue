<template>
  <BookmarkView
    :bookmarks="bookmarks"
    :bookmark-selected-tab-id="bookmarkSelectedTabId"
    :on-bookmark-tab-selection-change="onBookmarkTabSelectionChange"
  />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import type { Bookmark } from './interfaces';
import BookmarkView from './components/BookmarkView.vue';

const bookmarks = ref<Bookmark[]>([]);
const bookmarkSelectedTabId = ref('');

onBeforeMount(() => {
  void chrome.runtime.sendMessage({ type: 'getState' });
});

function onBookmarkTabSelectionChange(tabId: string): void {
  void chrome.runtime.sendMessage({ type: 'setBookmarkTabSelectionId', tabId });
}

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'newState':
      bookmarks.value = message.state.bookmarks;
      bookmarkSelectedTabId.value = message.bookmarkSelectedTabId;
      break;
    case 'newBookmarkTabSelectionId':
      bookmarkSelectedTabId.value = message.tabId;
      break;
  }
});

// const tabList = [
//   {
//     key: 'bookmarks',
//     tab: 'Bookmarks',
//   },
// ];
// const tabSelected = ref('bookmarks');
//
// const onTabChange = (value: string): void => {
//   tabSelected.value = value;
// };
</script>
