import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import printMsg from 'lxm_fri_npm'
console.log(printMsg(), '????')

createApp(App).use(ElementPlus, { size: 'mini', zIndex: 3000 }).use(router).mount('#app')
