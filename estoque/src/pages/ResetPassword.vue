<template>
  <q-page class="row items-center justify-center q-px-lg">
    <q-form
      @submit.prevent="handleForgotPassword"
      class="q-gutter-y-md reset-password-box"
    >
      <h4 class="text-h4 text-center">
        Reset Password
      </h4>

      <q-input
        v-model="form.email"
        type="email"
        label="Your e-mail *"
        aria-required="true"
      />

      <div class="full-width column q-mt-xl">
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          size="lg"
          icon-right="keyboard_arrow_right"
          align="between"
          class="q-mb-md"
          no-caps
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
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from 'src/composables/useAuth'

import type { User } from 'src/types'

defineComponent({
  name: 'ResetPasswordPage'
})

const router = useRouter()

const { resetPassword } = useAuth()

const form = ref({
  email: ''
}) as Ref<User>

const handleForgotPassword = async () => {
  try {
    await resetPassword(form.value)
    await router.push({ name: '/' })
  } catch (error: any) {
    console.error(error.message)
  }
}
</script>

<style scoped>
  .reset-password-box {
    max-width: 400px;
    width: 100%;
  }
</style>
