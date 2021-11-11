<template>
  <form @submit.prevent>
    <button @click="count--"> - </button>
    <input :value="count" disabled>
    <button @click="count++"> + </button>
  </form>
</template>

<script setup lang="ts">
import {ref} from 'vue';
const count = ref(0);
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-size: 16px;
  margin: 0;
  padding: 0;
}

form {
  display: flex;

  button {
    background: #ccc;
    border: 0;
    border-radius: 0;
    width: 40px;
    height: 40px;
  }
  input {
    width: 60px;
    padding: 0 20px;
    margin: 0;
    border: 1px solid #ccc;
    text-align: center;

    &[disabled] {
      background: #f8f8f8;
    }
  }
}
</style>
