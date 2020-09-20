import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import './plugins/axios'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue2TouchEvents from 'vue2-touch-events'
require('vue2-animate/dist/vue2-animate.min.css')

Vue.config.productionTip = false
Vue.use(VueCarousel)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vue2TouchEvents)

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = event => {

      if (!(el == event.target || el.contains(event.target))) {
			
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
