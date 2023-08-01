<template>
  <q-page class="row items-center justify-center q-px-lg">
    <div class="q-gutter-y-md">
      <h4 class="text-h4 text-center">
        My account
      </h4>

      <h2 v-if="user" class="text-h2 text-center">
        Welcome, {{ user.user_metadata.name }}!
      </h2>

      <q-btn
        label="Logout"
        type="submit"
        color="primary"
        size="md"
        icon-right="logout"
        no-caps
        flat
        @click="logout"
        to="/"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import useAuth from 'src/composables/useAuth'

defineComponent({
  name: 'MyAccountPage'
})

const { user, logout } = useAuth()

</script>
