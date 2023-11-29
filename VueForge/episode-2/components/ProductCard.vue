<script setup lang="ts">
defineProps<{
  product: any;
}>();
</script>

<template>
  <NuxtLink
    class="block product-card"
    :to="{ name: 'products-id', params: { id: product.sys.id } }"
  >
    <div class="card h-full bg-base-100 shadow-xl relative">
      <div class="absolute top-0 right-0 p-5">
        <ProductHeat :heatLevel="product.fields.heatLevel" />
      </div>

      <figure>
        <img
          :src="product.fields.image[0].fields?.file.url"
          :alt="product.fields.image[0].fields?.file.description"
        />
      </figure>

      <div class="card-body">
        <h2 class="text-center font-bold text-sm mb-2">
          {{ product.fields.name }}
        </h2>

        <div class="p-2 justify-center">
          <ProductPrice :price="product.fields.price" />
        </div>

        <div class="card-actions justify-center mt-3">
          <button class="btn btn-primary">View Item</button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}
</style>