<template>
  <Header />

  <div class="p-8 h-screen bg-white dark:bg-gray-900">
    <p class="text-black mb-8 dark:text-white">
      <span>Current viewport: [ {{ isMatching ? 'mobile' : 'desktop' }} ]</span>
      <small class="block opacity-50">refresh the page to check</small>
    </p>

    <Counter />
  </div>
</template>

<script setup lang="ts">
import useViewport from "./composables/useViewport";

import { onMounted } from "vue";

const { checkLessThan, isMatching } = useViewport();

onMounted(() => {
  checkLessThan(767);
})

</script>
