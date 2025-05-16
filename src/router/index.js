import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/Login.vue'
import RegisterView from '@/views/auth/Register.vue'
import CompanyRegisterView from '@/views/auth/Company-register.vue'

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
        component: LoginView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    {
        path: '/register-company',
        name: 'RegisterCompany',
        component: CompanyRegisterView
    },

    {
        path: '/:pathMatch(.*)*',
        redirect: '/inicio'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router