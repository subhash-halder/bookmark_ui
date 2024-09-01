<template>
  <div class="card" v-if="bookmark.children && bookmark.children.length > 0">
    <div class="card-header">{{ bookmark.title }}</div>
    <div class="card-body">
      <link-card
        v-for="child in bookmark.children"
        :bookmark="child"
        :key="child.id"
      />
    </div>
  </div>
  <div v-else class="anchor-wrapper">
    <a :href="bookmark.url">{{ bookmark.title }}</a>
  </div>
</template>

<script setup lang="ts">
import type { Bookmark } from '../interfaces';
defineProps<{ bookmark: Bookmark }>();
</script>
