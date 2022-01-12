<template>
  <header>
    <NuxtLink to="/"> Home </NuxtLink>
    header
  </header>

  <main class="layout-default">
    <slot />
  </main>

  <footer>
    footer
  </footer>
</template>

<style lang="scss">
  @import "./assets/scss/main";
</style>
