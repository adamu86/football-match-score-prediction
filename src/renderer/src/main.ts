import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/material'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).use(ToastService).mount('#app')