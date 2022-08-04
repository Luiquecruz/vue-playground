<template>
  <div class="about">
    <nav>
      <NLink to="/">home</NLink>
      <NLink to="/about">about</NLink>
    </nav>

    <hr />

    <div class="counter">{{ store.state.counter }}</div>
  </div>
</template>

<script>
import { defineComponent, inject } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'About',
  setup() {
    const store = inject('store')

    return {
      store,
    }
  },
})
</script>
