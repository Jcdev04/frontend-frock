//DEFAULT
import { createApp } from 'vue'
import App from './App.vue'

//I18n falta

//PRIMEVUE
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

//TOAST
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

//PRIMEICONS and PRIMEFLEX
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

//MAS COMPONENTES PRIMEVUE
import SelectButton from 'primevue/selectbutton';
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Image from "primevue/image";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';

//FORMS
import { Form } from '@primevue/forms';


//ROUTER
import router from './router'

// Forzar la eliminación del token de autenticación al iniciar la aplicación
// Esto asegura que siempre comience en la página de login
localStorage.removeItem('auth_token');


//APP COMO TAL
const app = createApp(App)

//PRIMEVUE
app.use(PrimeVue,{
    theme:{
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    },
});

//router for page view
app.use(router)

//TOAST AND TOAST SERVICE
app.use(ToastService);
app.component('pb-Toast', Toast);

//MAS COMPONENTES PRIMEVUE
app.component('pb-Toolbar', Toolbar);
app.component('pb-Button', Button);
app.component('pb-SelectButton', SelectButton);
app.component('pb-Card', Card);
app.component('pb-Dialog', Dialog);
app.component('pb-InputText', InputText);
app.component('pb-InputNumber', InputNumber);
app.component('pb-Message', Message);

//FOR DATATABLE COMPONENT
app.component('pb-DataTable', DataTable);
app.component('pb-Column', Column);
app.component('pb-ColumnGroup', ColumnGroup);
app.component('pb-Row', Row);
//IMAGE
app.component('pb-Image', Image);

//FORMS
app.component('pb-Form', Form);


    app.mount('#app')