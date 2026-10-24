<script setup lang="ts">
const props = defineProps<{ text: string }>()

const segments = computed(() => splitInlineCode(props.text))
</script>

<template>
  <template v-for="(segment, index) in segments" :key="index">
    <code v-if="segment.code" class="base-inline-code">{{ segment.text }}</code>
    <template v-else>{{ segment.text }}</template>
  </template>
</template>

<style scoped>
.base-inline-code {
  border-radius: 4px;
  background: var(--color-background);
  padding: 0.05rem 0.3rem;
  font-size: 0.85em;
}
</style>
