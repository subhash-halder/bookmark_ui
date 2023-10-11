<template>
  <a-card
    style="width: 100%"
    :tab-list="tabList"
    :active-tab-key="bookmarkSelectedTabId"
    @tabChange="(key) => onBookmarkTabSelectionChange(key)"
  >
    <div style="background-color: #2b2b2b; padding: 20px">
      <p v-if="childrens.length > 0">
        <a-list
          :grid="{ gutter: 4, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4 }"
          :data-source="childrens"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <LinkCard :bookmark="item" />
            </a-list-item>
          </template>
        </a-list>
      </p>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Bookmark } from '../interfaces';
import LinkCard from './LinkCard.vue';

const props = withDefaults(
  defineProps<{
    bookmarks: Bookmark[];
    bookmarkSelectedTabId: string;
    onBookmarkTabSelectionChange: (tabId: string) => void;
  }>(),
  {
    bookmarks: () => [],
  }
);

const tabList = ref(
  props.bookmarks.map((bm) => ({
    key: bm.id,
    tab: bm.title,
    tabDetails: bm,
  }))
);

const childrens = ref<Bookmark[]>([]);

watch(
  () => props.bookmarkSelectedTabId,
  (value) => {
    childrens.value =
      tabList.value.find((t) => t.tabDetails.id === value)?.tabDetails
        .children ?? [];
  }
);

watch(
  () => props.bookmarks,
  (value) => {
    tabList.value = value.map((bm) => ({
      key: bm.id,
      tab: bm.title,
      tabDetails: bm,
    }));

    childrens.value =
      tabList.value.find((t) => t.tabDetails.id === props.bookmarkSelectedTabId)
        ?.tabDetails.children ?? [];
  }
);
</script>
