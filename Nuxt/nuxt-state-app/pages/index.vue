<template>
  <div class="home">
    <nav>
      <NLink to="/">home</NLink>
      <NLink to="/about">about</NLink>
    </nav>

    <hr />

    <div class="counter">{{ store.state.counter }}</div>

    <div class="buttons">
      <button @click="decrease">-</button>
      <button @click="increase">+</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = inject('store')

    const decrease = () => {
      store.state.counter--
    }
    const increase = () => {
      store.state.counter++
    }

    return {
      store,
      decrease,
      increase,
    }
  },
})
</script>
