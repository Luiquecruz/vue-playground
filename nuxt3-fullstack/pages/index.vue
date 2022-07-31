<template>
  <h1>{{ piniaTest.valueToCheck }}</h1>
</template>

<script setup lang="ts">
import { usePiniaCheck } from "~/store/piniaCheck";

const piniaTest = usePiniaCheck();
</script>