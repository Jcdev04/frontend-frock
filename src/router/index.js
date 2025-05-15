import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/Login.vue'
import RegisterView from '@/views/auth/Register.vue'
import CompanyRegisterView from '@/views/auth/Company-register.vue'

// Importamos un componente placeholder para las rutas que aún no están implementadas
const PlaceholderView = {
    template: '<div class="placeholder"><h2>Esta página está en desarrollo</h2><p>Próximamente disponible</p></div>',
    style: `
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 60px);
      text-align: center;
      padding: 20px;
    }
    h2 {
      margin-bottom: 10px;
      color: #333;
    }
    p {
      color: #666;
    }
  `
}

// Definimos las rutas
const routes = [
    {
        path: '/',
        redirect: '/inicio'
    },
    {
        path: '/inicio',
        name: 'Inicio',
        component: PlaceholderView
    },
    {
        path: '/paraderos',
        name: 'Paraderos',
        component: PlaceholderView
    },
    {
        path: '/rutas',
        name: 'Rutas',
        component: PlaceholderView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView // Actualizado para usar el componente de login
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView // Nueva ruta para el registro
    },
    {
        path: '/register-company',
        name: 'RegisterCompany',
        component: CompanyRegisterView // Nueva ruta para el registro de empresa
    },
    // Ruta para manejar rutas no encontradas
    {
        path: '/:pathMatch(.*)*',
        redirect: '/inicio'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Aquí puedes agregar guardias de navegación para verificar la autenticación
// Por ejemplo:
/*
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
*/

export default router