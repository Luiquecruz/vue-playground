import { defineComponent, h, ref } from 'vue';

export default defineComponent({
  name: 'TaskInput',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: [
    'update:modelValue',
    'input',
    'click',
    'blur',
    'focus',
    'keydown',
    'keyup',
    'keypress',
  ],
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    return () => h('label', {
      class: 'label',
    }, [
      props.label,
      h('input', {
        type: 'text',
        class: 'input',
        placeholder: 'Create a new task',
        value: props.modelValue,
        onClick: (event: MouseEvent) => {
          emit('click', event);
        },
        onBlur: (event: FocusEvent) => {
          emit('blur', event);
          emit('update:modelValue', value);
        },
        onFocus: (event: FocusEvent) => {
          emit('focus', event);
        },
        onKeyDown: (event: KeyboardEvent) => {
          emit('keydown', event);
        },
        onKeyUp: (event: KeyboardEvent) => {
          emit('keyup', event);
        },
        onKeyPress: (event: KeyboardEvent) => {
          emit('keypress', event);
        },
        onInput: (event: Event) => {
          const target = event?.target as HTMLInputElement;

          emit('input', event);
          emit('update:modelValue', target.value);
        }
      })
    ])
  }
})
