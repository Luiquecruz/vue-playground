import { createClient } from '@supabase/supabase-js'
import useAuth from 'src/composables/useAuth'

const supabaseUrl: string | any = process.env.SUPABASE_URL
const supabaseKey: string | any = process.env.SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuth()

  user.value = session?.user || null
})

export default () => ({ supabase })
