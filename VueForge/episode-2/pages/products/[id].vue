<script setup>
import * as marked from "marked";

const route = useRoute();
const productStore = useProductStore();

const { data: product } = await useAsyncData(
  `product${ route.params.id }`,
  async () => {
    if (route.params.id === "undefined") return productStore.singleProduct;
    await productStore.fetchProduct(route.params.id);
    return productStore.singleProduct;
  },
  {
    pick: [ "fields", "sys" ],
  }
);

const description = computed(() =>
  product.value ? marked.parse(product.value?.fields?.description) : null
);

function handleAddToCart(product) {
  useCartStore().addProduct(product, 1);
  useAlertsStore().success(product.fields.name + " added to cart");
}
</script>
<template>
  <div class="mt-10 max-w-6xl mx-auto">
    <div v-if="product">
      <div class="sm:flex">
        <img
          class="mr-10 h-80 object-contain sm:w-1/3"
          :src="product?.fields.image[0].fields?.file.url"
          :alt="product?.fields.image[0].fields?.file.description"
        />
        <div class="px-10 sm:pl-0 sm:w-2/3">
          <h1 class="text-2xl">{{ product?.fields.name }}</h1>

          <div class="prose prose-sm">
            <p>{{ product.fields.summary }}</p>
          </div>

          <p class="my-2">
            Heat level:
            <ProductHeat :heatLevel="product.fields.heatLevel" />
          </p>

          <h2 class="text-xl my-4">
            <ProductPrice :price="product.fields.price" />
          </h2>

          <button class="btn btn-primary" @click="handleAddToCart(product)">
            Add to cart
          </button>
        </div>
      </div>

      <section>
        <hr class="my-10" />

        <h3 class="font-bold text-gray-500">Description</h3>
        <div class="prose" v-html="description" />
      </section>

      <ProductReviews :productId="product.sys.id" />
    </div>
  </div>
</template>