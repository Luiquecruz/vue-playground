<template>
  <div :class="`alert type__${setAlertType}`">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type AlertTypes = 'success' | 'warning' | 'error' | 'info';

const props = defineProps({
  message: {
    type: String,
    default: 'Hello from alert',
  },
  alertType: {
    type: String,
    default: 'default',
  }
})

const setAlertType = computed<string | AlertTypes>(() => props.alertType)
</script>

<style lang="scss" scoped>
.alert {
  @apply flex m-4 py-2 px-4;

  // @TODO: scss nesting not working
  //.type {
  //  &__default {
  //    @apply bg-gray-200 text-gray-800;
  //  }
  //
  //  &__success {
  //    @apply bg-green-600 text-gray-800;
  //  }
  //
  //  &__warning {
  //    @apply bg-yellow-400 text-gray-800;
  //  }
  //
  //  &__error {
  //    @apply bg-red-600 text-gray-50;
  //  }
  //
  //  &__info {
  //    @apply bg-blue-300 text-gray-800;
  //  }
  //}
}

.alert.type__default {
  @apply bg-gray-200 text-gray-800;
}

.alert.type__success {
  @apply bg-green-400 text-gray-900;
}

.alert.type__warning {
  @apply bg-yellow-300 text-gray-900;
}

.alert.type__error {
  @apply bg-rose-700 text-gray-50;
}

.alert.type__info {
  @apply bg-blue-200 text-gray-900;
}
</style>