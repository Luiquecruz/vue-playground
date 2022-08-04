<template>
  <header>
    <nav>
      <NLink to="/" class="logo">
        <img
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/cc/cc12bce2f1cf5884ea7860d5498427ba988bb4f6_full.jpg"
          alt="logo"
          width="80px"
          height="80px"
        />
      </NLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1140px;
  width: 100%;
  height: 80px;
  padding: 0 3rem;
  margin: 0;
}

.logo {
  display: inline-block;
  text-decoration: none;
  line-height: 0;
}
</style>
