<template>
  <header>
    <nav class="py-4 px-8 flex justify-between bg-gray-50 dark:bg-gray-800">
      <div class="logo">
        logo
      </div>

      <ul class="flex">
        <li v-for="i in 3" class="mx-2">link {{ i }}</li>
      </ul>

      <div class="actions">
        <!-- dark mode toggle -->
        <button
          class="flex"
          @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
        >
          <span class="pr-2">{{ $colorMode.preference }}</span>
          <!-- moon -->
          <svg
            v-if="$colorMode.value === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-50"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>

          <!-- sun -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  nav {
    > div,
    > ul {
      @apply text-black dark:text-white;
    }

    ul {
      li {
        margin: 0 .75rem;
      }
    }
  }
}
</style>

<script setup lang="ts">
type Theme = 'light' | 'dark';
const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme
}
</script>