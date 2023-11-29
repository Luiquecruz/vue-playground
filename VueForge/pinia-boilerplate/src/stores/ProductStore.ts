import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, type Ref } from "vue";

import type { Product } from "@/types";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: ref([]) as Ref<Product[]>
  }),
  actions: {
    async getProducts() {
      const res = await fetch("/products.json")
      this.products = await res.json()
    }
  }
})

if (import.meta.hot)  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))