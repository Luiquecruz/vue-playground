import { defineStore } from 'pinia';

export const usePiniaCheck = defineStore({
  id: 'piniaCheck',

  state: () => ({
    works: 'yes'
  }),

  getters: {
    valueToCheck: state => `Is Pinia working? ${ state.works }`
  },

  actions: {
    setNewValue(newValue: string) {
      this.works = newValue
    }
  }
})