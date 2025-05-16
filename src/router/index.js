import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/Login.vue'
import RegisterView from '@/views/auth/Register.vue'
import CompanyRegisterView from '@/views/auth/Company-register.vue'
import RutasView from '@/combiroutes/presentation/views/RutasView.vue'

// Definimos las rutas
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { requiresAuth: false }
    },
    {
        path: '/register-company',
        name: 'CompanyRegister',
        component: CompanyRegisterView,
        meta: { requiresAuth: false }
    },
    {
        path: '/rutas',
        name: 'Rutas',
        component: RutasView,
        meta: { requiresAuth: true }
    },
    // Ruta para manejar rutas no encontradas
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Guardia de navegación para proteger rutas que requieren autenticación
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = localStorage.getItem('auth_token') !== null

    // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a login
    if (requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router