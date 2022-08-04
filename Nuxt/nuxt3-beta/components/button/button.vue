<script lang="ts">
import {defineComponent, computed, reactive, h} from 'vue';
import {ButtonProps, useButtonProps} from "./button-commons";

export default defineComponent({
  name: "button",
  props: useButtonProps,
  setup(props: ButtonProps, {slots, emit}) {
    const buttonText = computed<string>(() => props.text || '');

    const isLink = props.to;
    const linkData = reactive<object>({
      href: props.to,
    });

    const isOuter = props.outter;
    const outerData = reactive<object>({
      rel: 'noopener noreferrer',
      target: '_blank',
    });

    return () => h(
        props.tag || 'button',
        {
          class: ['button'],
          ...(isLink ? linkData : {}),
          ...(isOuter ? outerData : {}),
          onClick: (event: MouseEvent) => {
            emit('click', event);
          },
        },
        buttonText.value || slots?.default(),
    );
  },
});
</script>

<style lang="scss">

</style>
