<script setup>
const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
});
const pricePretty = computed(() => {
  return !props.price ? "$0.00" : `$${(props.price / 100).toFixed(2)}`;
});
</script>
<template>
  <span class="text-primary font-bold">{{ pricePretty }}</span>
</template>