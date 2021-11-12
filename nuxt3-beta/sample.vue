<template>
  <form @submit.prevent>
    <button @click="count--"> - </button>
    <input :value="count" disabled>
    <button @click="count++"> + </button>
  </form>

  <pre>
    {{data}}
  </pre>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAsyncData } from '#app';

  // testing Vue 3 stuff
  const count = ref(0);

  // useFetch Hook
  // const { data }: {data: any} = await useFetch("/api/tvmaze?search=batman");

  // useAsyncData Hook
  const { data }: {data: any} = await useAsyncData(
    "searchData",
    () => $fetch("../api/tvmaze?search=predator")
  );
</script>

<!--<script>-->
<!--  export default {-->
<!--    layout: 'restrict'-->
<!--  };-->
<!--</script>-->

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
