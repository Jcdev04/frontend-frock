//DEFAULT
import { createApp } from 'vue'
import App from './App.vue'

//I18n
import { i18n } from "../public/i18n/i18n.js";

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
import SplitButton from 'primevue/splitbutton';
import ProgressSpinner from 'primevue/progressspinner';
import Select from 'primevue/select';
import IftaLabel from 'primevue/iftalabel';
import CascadeSelect from 'primevue/cascadeselect';

//confirm dialog
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

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
            darkModeSelector: false,
            cssLayer: false
        }
    },
});

// i18n
app.use(i18n);

//router for page view
app.use(router)

//TOAST AND TOAST SERVICE
app.use(ToastService);
app.component('pb-Toast', Toast);

//confirm dialog
app.component('pb-ConfirmDialog', ConfirmDialog);
app.use(ConfirmationService);

//MAS COMPONENTES PRIMEVUE
app.component('pb-Toolbar', Toolbar);
app.component('pb-Button', Button);
app.component('pb-SelectButton', SelectButton);
app.component('pb-Card', Card);
app.component('pb-Dialog', Dialog);
app.component('pb-InputText', InputText);
app.component('pb-InputNumber', InputNumber);
app.component('pb-Message', Message);
app.component('pb-SplitButton', SplitButton);
app.component('pb-ProgressSpinner', ProgressSpinner);
app.component('pb-Select', Select);
app.component('pb-IftaLabel', IftaLabel);
app.component('pb-CascadeSelect', CascadeSelect);

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