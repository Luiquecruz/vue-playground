import { reactive } from '@nuxtjs/composition-api'

const composableState = reactive({
  counter: 0,
})

return { composableState }
