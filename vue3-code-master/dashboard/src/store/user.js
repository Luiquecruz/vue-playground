import { reactive } from 'vue'

const state = reactive({
  currentUser: {}
})

export default state

export function setCurrentUser(user) {
  state.currentUser = user
}

export function cleanCurrentUser() {
  state.currentUser = {}
}

export function setApiKey(apiKey) {
  const currentUser = { ...state.currentUser, apiKey }
  state.currentUser = currentUser
}
