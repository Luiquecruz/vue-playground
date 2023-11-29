<script setup>
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
const { addItem } = useCartStore();

import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

const productStore = useProductStore();
productStore.getProducts();
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
        @addToCart="addItem(product.id, $event)"
      />
    </ul>
  </div>
</template>
