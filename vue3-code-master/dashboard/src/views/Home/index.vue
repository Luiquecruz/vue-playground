<template>
  <CustomHeader @createAccount="handleAccountCreate" @login="handleLogin" />
  <Contact />

  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker &copy; 2021</p>
  </footer>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import useModal from '../../hooks/useModal'

import CustomHeader from './CustomHeader'
import Contact from './Contact'

export default {
  name: 'Home',
  components: {
    CustomHeader,
    Contact
  },
  setup() {
    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      const token = window.localStorage.getItem('token')

      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    const handleAccountCreate = () => {
      modal.open({
        component: 'ModalCreateAccount'
      })
    }

    const handleLogin = () => {
      modal.open({
        component: 'ModalLogin'
      })
    }

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>
