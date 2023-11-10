import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueCookies, {expires: '7d'})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
