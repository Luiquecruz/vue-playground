<script setup lang="ts">
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();

const search = computed({
  get() {
    return route.query.search ?? '';
  },
  set(search) {
    router.replace({query: {search}});
  }
});
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">About</h1>
  <p>This is a simple task management application using Vue 3.</p>
  <label>
    Search: <input v-model.trim="search" maxlength="20">
  </label>
</template>

<style scoped></style>
