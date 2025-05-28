import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/auth/components/Login.vue'
import RegisterView from '@/auth/components/Register.vue'
import CompanyRegisterView from '@/auth/components/Company-register.vue'
import RoutesPage from '@/company-management/pages/RoutesPage.vue'
import RoutesList from "@/catalogue-routes/components/routes-list/routes-list.vue";
import RouteCompleteDetailsComponent from "@/catalogue-routes/pages/route-complete-details.component.vue";
import ScheduleDayComponent from "@/onboarding/pages/attention-schedule.component.vue"
import StopsPage from "@/company-management/pages/StopsPage.vue";
import HomePage from "@/company-management/pages/HomePage.vue";
import CompanyPage from "@/company-management/pages/CompanyPage.vue";

// Definimos las rutas
const routes = [
    {
        path: '/',
        component: RoutesList
    },
    {
        path: '/route/:id',
        name: 'RouteDetail',
        component: RouteCompleteDetailsComponent,
        props: (route) => ({ routeId: route.params.id })
    },
    {
        path: '/config/attention',
        name: 'AttentionSchedule',
        component: ScheduleDayComponent,
        meta: {
            title: 'Horarios de Atención',
            /*requiresAuth: true */
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        /*meta: { requiresAuth: false }*/
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        /*meta: { requiresAuth: false }*/
    },
    {
        path: '/register-company',
        name: 'CompanyRegister',
        component: CompanyRegisterView,
    },
    {
        path: '/company',
        redirect: "/company/home",
        name: "Company",
        component: CompanyPage,
        children: [
            {
                path: "home",
                name: "Home",
                component: HomePage
            },
            {
                path: "stops",
                name: 'Stops',
                component: StopsPage,
            },
            {
                path: 'routes',
                name: 'Rutas',
                component: RoutesPage,
                /*meta: { requiresAuth: true }*/
            }
        ]
    },
    // RouteEntity para manejar rutas no encontradas
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
/*
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
})*/

export default router