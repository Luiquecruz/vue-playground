import { readonly } from 'vue'
import userModule from './user'
import globalModule from './global'

export default readonly({
  User: userModule,
  Global: globalModule
})
