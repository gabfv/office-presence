import './assets/main.css'

import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const toastOptions = {
    position: 'bottom-right',
    duration: 5000,
};

app.use(ToastPlugin, toastOptions);
app.use(router);

app.mount('#app');
