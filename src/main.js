import Vue from 'vue'

import router from './router'
import store from './store/index'
import i18n from './lang'
import './assets/styles/global.scss'
import './assets/iconfont/icomoon.css'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
import './mock'
new VConsole() // 初始化

Vue.config.productionTip = false

import App from './App.vue'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
