<template>
  <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "input",
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String
    },
  },
}
</script>

<style scoped>

</style>

<!--code 2-->
<!--<template>-->
<!--  <div class="input">-->
<!--    <label-->
<!--        v-if="label"-->
<!--        :for="id"-->
<!--        class="input__label"-->
<!--    >-->
<!--      {{ label }}-->

<!--      <span-->
<!--          v-if="required"-->
<!--          class="input__label__required"-->
<!--      >-->
<!--        *-->
<!--      </span>-->
<!--    </label>-->

<!--    <input-->
<!--        :id="id"-->
<!--        :autocomplete="autocomplete"-->
<!--        :autofocus="autofocus"-->
<!--        :disabled="disabled"-->
<!--        :max="max"-->
<!--        :min="min"-->
<!--        :name="name"-->
<!--        :placeholder="placeholder"-->
<!--        :readonly="readonly"-->
<!--        :required="required"-->
<!--        :type="inputType"-->
<!--        :value="modelValue"-->
<!--        class="input__field"-->
<!--        @input="$emit('update:modelValue', $event.target.value)"-->
<!--    />-->

<!--    <small-->
<!--        v-if="hint"-->
<!--        class="input__hint"-->
<!--    >-->
<!--      {{ hint }}-->
<!--    </small>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {ref} from 'vue';-->
<!--import {InputProps, useInputProps} from './input-commons';-->

<!--export default {-->
<!--  name: "input",-->
<!--  props: useInputProps,-->
<!--  setup(props: InputProps) {-->
<!--    const inputType = ref<string>(props.type);-->

<!--    return {-->
<!--      inputType,-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style lang="scss">-->

<!--</style>-->
