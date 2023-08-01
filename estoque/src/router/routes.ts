import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { /* User Authentication routes */
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login-page', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') }
    ]
  },
  { /* User account routes */
    path: '/my-account',
    component: () => import('layouts/MyAccountLayout.vue'),
    children: [
      { path: '', name: 'my-account', component: () => import('pages/MyAccount.vue') }
    ]
  },
  { /* Main navigation */
    path: '/demo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
