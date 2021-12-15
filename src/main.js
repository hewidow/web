import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import echarts from 'echarts'
import axios from 'axios'
import swiper from 'swiper'
import TopAppBar from './components/TopAppBar'
Vue.component('top-app-bar', TopAppBar)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$swiper = swiper

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
