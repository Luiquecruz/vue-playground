<template>
  <q-page class="row items-center justify-center q-px-lg">
    <q-form
      @submit.prevent="handleRegister"
      class="q-gutter-y-md register-form-box"
    >
      <h4 class="text-h4 text-center">
        Register
      </h4>

      <q-input
        v-model="form.name"
        type="text"
        label="Your name *"
        aria-required="true"
      />

      <q-input
        v-model="form.email"
        type="email"
        label="Your e-mail *"
        aria-required="true"
      />

      <q-input
        v-model="form.password"
        type="password"
        label="Your password *"
      />

      <div class="full-width column q-mt-xl">
        <q-btn
          label="Register"
          type="submit"
          color="primary"
          size="lg"
          icon-right="person_add_alt"
          align="between"
          class="q-mb-md"
          no-caps
        />

        <q-btn
          label="Already have an account? Log in here!"
          type="button"
          color="primary"
          size="md"
          to="/login"
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
  name: 'RegisterPage'
})

const router = useRouter()

const { register } = useAuth()

const form = ref({
  name: '',
  email: '',
  password: ''
}) as Ref<User>

const handleRegister = async () => {
  try {
    await register(form.value)
    await router.push({
      name: 'email-confirmation',
      query: { email: form.value.email }
    })
  } catch (error: any) {
    console.error(error.message)
  }
}
</script>

<style scoped>
.register-form-box {
  max-width: 400px;
  width: 100%;
}
</style>
