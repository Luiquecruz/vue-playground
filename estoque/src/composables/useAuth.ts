import useSupabase from 'boot/supabase'
import { ref, type Ref } from 'vue'

import type { User } from 'src/types'

const user = ref(null) as Ref<User | unknown>

export default () => {
  const { supabase } = useSupabase()

  const isLoggedIn = () => !!user.value

  const login = async ({ email, password }: User) => {
    const { user, error } = await supabase.auth.signIn({ email, password })

    if (error) throw error

    return user
  }

  const socialLogin = async (provider: 'facebook' | 'google') => {
    const { user, error } = await supabase.auth.signIn({ provider })

    if (error) throw error

    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
  }

  const register = async ({ email, password, ...meta }: User) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/my-account?fromEmail=registrationConfirmation`
      }
    )

    if (error) throw error

    return user
  }

  const update = async ({ data }: User) => {
    const { user, error } = await supabase.auth.update(data)

    if (error) throw error

    return user
  }

  const resetPassword = async ({ email }: User) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

    if (error) throw error

    return data
  }

  return {
    user,
    isLoggedIn,
    login,
    socialLogin,
    logout,
    register,
    update,
    resetPassword
  }
}
