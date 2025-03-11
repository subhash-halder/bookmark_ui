<template>
  <div>
    <div class="main-header">
      <div class="logo">
        <img class="logo-img" src="/icons/icon48.png">
        <div class="logo-text">Bookmark Buddy</div>
      </div>
      <div class="tabs">
        <div v-for="tab in tabList" :key="tab.key" :class="{ tab: true, active: tab.key === props.bookmarkSelectedTabId }"
          @click="
            () => {
              console.log(tab);
              onBookmarkTabSelectionChange(tab.key);
            }
          ">
          {{ tab.tab }}
        </div>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <button @click="toggle_theme()" class="theme-toggle" id="themeToggle">🌙</button>

    </div>

    <div class="tab-content active">
      <div class="card-container">
        <div v-for="children in childrens" :key="children.id">
          <LinkCard :bookmark="children" />
        </div>
      </div>
    </div>

    <!-- <div -->
    <!--   :tab-list="tabList" -->
    <!--   :active-tab-key="bookmarkSelectedTabId" -->
    <!--   @tabChange="(key: string) => onBookmarkTabSelectionChange(key)" -->
    <!-- > -->
    <!--   <div style="background-color: #2b2b2b; padding: 20px"> -->
    <!--     <p v-if="childrens.length > 0"> -->
    <!--       <a-list -->
    <!--         :grid="{ gutter: 2, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4 }" -->
    <!--         :data-source="childrens" -->
    <!--       > -->
    <!--         <template #renderItem="{ item }"> -->
    <!--           <a-list-item> -->
    <!--             <LinkCard :bookmark="item" /> -->
    <!--           </a-list-item> -->
    <!--         </template> -->
    <!--       </a-list> -->
    <!--     </p> -->
    <!--   </div> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Bookmark } from '../interfaces';
import LinkCard from './LinkCard.vue';


function toggle_theme(): void {
  const themeToggle = document.getElementById('themeToggle') as HTMLElement;
  document.body.classList.toggle('day-theme');
  themeToggle.textContent = document.body.classList.contains('day-theme')
    ? '☀️'
    : '🌙';
}


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
