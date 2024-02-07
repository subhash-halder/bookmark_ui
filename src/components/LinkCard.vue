<template>
  <a-card
    v-if="bookmark.children && bookmark.children.length > 0"
    :title="bookmark.title"
    :bordered="false"
  >
    <link-card
      v-for="child in bookmark.children"
      :bookmark="child"
      :key="child.id"
    />
  </a-card>
  <p v-else>
    <a :href="bookmark.url">{{ bookmark.title }}</a>
  </p>
</template>

<script setup lang="ts">
import type { Bookmark } from '../interfaces';
defineProps<{ bookmark: Bookmark }>();
</script>
