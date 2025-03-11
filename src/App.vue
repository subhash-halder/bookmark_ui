<template>
  <BookmarkView
    :bookmarks="bookmarks"
    :bookmark-selected-tab-id="bookmarkSelectedTabId"
    :on-bookmark-tab-selection-change="onBookmarkTabSelectionChange"
  />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, onUpdated } from 'vue';
import type { Bookmark } from './interfaces';
import BookmarkView from './components/BookmarkView.vue';

const bookmarks = ref<Bookmark[]>([]);
const bookmarkSelectedTabId = ref('');

function resizeGridItem(item: HTMLElement): void {
  const grid: HTMLElement = item.parentNode?.parentNode as HTMLElement;
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
  );
  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
  );

  const contentHeight = item.getBoundingClientRect().height;
  const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));

  (item.parentElement as HTMLElement).style.gridRowEnd = 'span ' + rowSpan;
}

function resizeAllGridItems(): void {
  const allItems = document.querySelectorAll(
    '.tab-content > .card-container > div > .card'
  );
  allItems.forEach((item) => {
    resizeGridItem(item as HTMLElement);
  });
}

(window as any).resizeAllGridItems = resizeAllGridItems;

onBeforeMount(() => {
  void chrome.runtime.sendMessage({ type: 'getState' });
});

onMounted(() => {
  resizeAllGridItems();
});

onUpdated(() => {
  resizeAllGridItems();
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
