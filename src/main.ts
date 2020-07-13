import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'


const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
