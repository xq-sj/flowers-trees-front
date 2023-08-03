import {createApp} from 'vue'

import App from './App.vue'

import './style.css'

// router
import router from './routers/index'

// global config 自定义全局配置
import '@/config/global'

//pinia
import {createPinia} from 'pinia'

const pinia = createPinia()

// svg icon
import 'virtual:svg-icons-register'

// particles 粒子特效
import Particles from 'particles.vue3';

const app = createApp(App);
app.use(router)
  .use(pinia)
  .use(Particles)
  .mount('#app');

