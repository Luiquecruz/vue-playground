<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia"
import { useCartStore } from "@/stores/CartStore";

import CartItem from "./CartItem.vue";
import products from "../../public/products.json";

const { items: storedCartItems, count, isEmpty } = storeToRefs(useCartStore());
const active = ref(false);
</script>

<template>
  <div class="relative">
    <div class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <span class="cart-count absolute">{{ count }}</span>
    </div>

    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="!isEmpty">
        <ul class="items-in-cart">
          <CartItem
            v-for="item in storedCartItems"
            :product="products.find((p) => item.id === p.id)"
            :count="item.count"
            @updateCount=""
            @clear=""
          />
        </ul>

        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>$40</strong>
        </div>

        <div class="flex justify-end" >
          <AppButton class="secondary mr-2">Clear Cart</AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>

      <div v-else>
        <p class="text-2xl text-center my-5">
          Looks like your cart Empty :(
        </p>
      </div>
    </AppModalOverlay>
  </div>
</template>

<style lang="pcss" scoped>
.items-in-cart {
  @apply mb-5;
}

.items-in-cart li {
  @apply flex justify-between p-2;
}

.items-in-cart li:nth-of-type(even) {
  @apply bg-gray-300;
}
</style>
