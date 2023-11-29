import { defineStore, storeToRefs, acceptHMRUpdate } from "pinia";
import { ref, type Ref } from "vue";

import type { CartItem } from "@/types";

import { useProductStore } from "@/stores/ProductStore";
const { products } = storeToRefs(useProductStore());

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: ref([]) as Ref<CartItem[]>
  }),

  actions: {
    addItem(itemId: string, count: number) {
      const item = this.items.find(item => item.id === itemId)

      if (item) item.count += count

      if (!item) this.items.push({ id: itemId, count })
    },
    updateTotalPrice()
  },

  getters: {
    count(): number {
      return this.items.reduce((c: any, item: any) => c + item.count, 0)
    },
    isEmpty(): boolean {
      return this.count === 0
    }
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))