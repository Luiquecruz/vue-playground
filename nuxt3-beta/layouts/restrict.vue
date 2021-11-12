<template>
  <header>
    <NuxtLink to="#"> There's no return </NuxtLink>
    restrict header
  </header>

  <main class="layout-restrict">
    <slot />
  </main>

  <footer>
    restrict footer
  </footer>
</template>

<script setup>

</script>

<style lang="scss">
@import "./assets/scss/main";
</style>
