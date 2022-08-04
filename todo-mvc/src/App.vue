<script lang="ts">
import {defineComponent, defineAsyncComponent, h} from 'vue'

// Render function
export default defineComponent({
  name: 'App',
  setup() {
    return () => h('div', {
      class: 'container mx-auto px-3',
    }, [
      h(defineAsyncComponent(() => import('./components/TaskForm.vue'))),
      h(defineAsyncComponent(() => import('./components/TaskList.vue'))),
    ])
  }
})
</script>
