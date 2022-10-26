
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/principal',
    name: 'principal',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', icono:'dashboard', label: 'Inicio', name: 'dashboard',component: () => import('src/modules/dashboard/DashBoard.vue') },
      { path: 'reportes', icono:'manage_accounts', label: 'Reportes 5s', name: 'reportes',component: () => import('src/modules/ReportesModule.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
