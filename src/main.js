// Configuración simple para PrimeVue v4+
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    unstyled: false
})
app.use(ToastService)

app.mount('#app')