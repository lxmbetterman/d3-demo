import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(ElementPlus, { size: 'mini', zIndex: 3000 }).use(router).mount('#app')
