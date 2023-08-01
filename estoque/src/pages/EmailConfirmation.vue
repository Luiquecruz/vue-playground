<template>
  <q-page class="row items-center justify-center q-px-lg">
    <div class="q-gutter-y-md email-confirmation-box">
      <h4 class="text-h4 text-center">
        Welcome to E-stoque!
      </h4>

      <p class="text-body1 text-center q-mt-xl q-mb-lg">
        In order to access our platform, check out your in-box to confirm the following email:
      </p>

      <div class="full-width column">
        <q-btn
          :label="$route.query?.email"
          type="button"
          color="primary"
          size="lg"
          class="q-mb-md cursor-inherit"
          no-caps
          outline
        />

        <q-btn
          label="Return to home screen"
          type="button"
          size="md"
          color="grey"
          to="/"
          flat
          no-caps
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'EmailConfirmationPage'
})
</script>

<style scoped>
  .email-confirmation-box {
    max-width: 400px;
    width: 100%;
  }
</style>
