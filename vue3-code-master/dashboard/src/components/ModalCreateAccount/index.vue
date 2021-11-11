<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Crie uma conta</h1>
    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          v-model="state.name.value"
          type="text"
          :class="{ 'border-brand-danger': !!state.name.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="Elon Musk"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="john.doe@email.com"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block pt-3">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="don't use 1234"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{ 'opacity-50': state.isLoading }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main transition-all duration-150 focus:outline-none"
      >
        <Icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Criar conta</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '../../hooks/useModal'
import services from '../../services'
import {
  validadeEmptyAndLength3,
  validadeEmptyAndEmail
} from '../../utils/validators'
import Icon from '../Icon'

export default {
  components: { Icon },
  name: 'modalLogin',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const modal = useModal()

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      'name',
      validadeEmptyAndLength3
    )

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validadeEmptyAndEmail
    )

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validadeEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    const login = async ({ email, password }) => {
      const { data, errors } = await services.auth.login({
        email,
        password
      })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        state.isLoading = false
        modal.close()
      }
    }

    const handleSubmit = async () => {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })

          return
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar a conta')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o login')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
