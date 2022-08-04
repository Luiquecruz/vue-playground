<template>
  <div class="flex">
    <button
      @click="func.dec"
      class="py-2 px-4 border border-black text-black
      dark:text-white dark:border-white"
    > -
    </button>

    <span class="py-2 px-4 text-black dark:text-white">
      {{ count }}
    </span>

    <button
      @click="func.inc"
      class="py-2 px-4 border border-black text-black
             dark:text-white dark:border-white"
    > +
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

const func = {
  inc: () => {
    count.value++;
  },
  dec: () => {
    count.value--;
  }
};
</script>
