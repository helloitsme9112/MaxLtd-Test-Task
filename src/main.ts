import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
// import '@/assets/scss/main.scss'
import 'element-plus/dist/index.css'
import router from './router'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(ElementPlus)
    .mount('#app')
