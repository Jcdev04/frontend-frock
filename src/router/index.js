import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/access-and-identity/pages/Login.vue'
import RegisterView from '@/access-and-identity/pages/Register.vue'
import CompanyRegisterView from '@/transport-company/pages/CompanyRegister.vue'
import RoutesPage from '@/network/pages/RoutesPage.vue'
import RouteCompleteDetailsComponent from "@/discovery/pages/route-complete-details.component.vue";
import StopsPage from "@/network/pages/StopsPage.vue";
import HomePage from "@/transport-company/pages/HomePage.vue";
import CompanyLayout from "@/shared/components/CompanyLayout.vue";
import RoutesList from "@/discovery/components/routes-list/routes-list.vue"
import TravellerLayout from "@/shared/components/TravellerLayout.vue";
import {APP_ROUTES} from "@/shared/services/routes.js";
import CompanyInformation from "@/transport-company/pages/CompanyInformation.vue";

const routes = [
    /*ROUTES FOR PUBLIC AND TRAVELLER DASHBOARD*/
    {
        path: "/",
        component: TravellerLayout,
        children: [
            {
                path: APP_ROUTES.PUBLIC.ROOT,
                component: RoutesList,
            },
            {
                path: APP_ROUTES.PUBLIC.ROUTES,
                name: "route-detail",
                component: RouteCompleteDetailsComponent,
                props: true
            }
        ]
    },
    /*ROUTES FOR AUTHENTICATION*/
    {
        path: APP_ROUTES.AUTH.ROOT,
        redirect: APP_ROUTES.AUTH.ROOT +"/"+ APP_ROUTES.AUTH.LOGIN,
        children: [
            {
                path: APP_ROUTES.AUTH.LOGIN,
                name: "LoginView",
                component: LoginView,
            },
            {
                path: APP_ROUTES.AUTH.REGISTER,
                component: RegisterView,
            },
        ]
    },
    /* ROUTES FOR COMPANY*/
   {
        path: "/"+APP_ROUTES.COMPANY.ROOT,
        children: [
            {
                path: APP_ROUTES.COMPANY.ONBOARDING,
                component: CompanyRegisterView,
            },
            {
                path: "",
                component: CompanyLayout,
                children: [
                    {
                        path: APP_ROUTES.COMPANY.HOME,
                        component: HomePage
                    },
                    {
                        path: APP_ROUTES.COMPANY.STOPS,
                        component: StopsPage,
                    },
                    {
                        path: APP_ROUTES.COMPANY.ROUTES,
                        component: RoutesPage,
                    },
                    {
                        path: APP_ROUTES.COMPANY.INFORMATION,
                        component: CompanyInformation,
                    }
                ]

            }
        ]
    },

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