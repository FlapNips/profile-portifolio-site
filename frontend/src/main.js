import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import './plugins/axios'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import textPTBR from '../public/textPTBR.json'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue2TouchEvents from 'vue2-touch-events'


Vue.config.productionTip = false
Vue.use(VueCarousel)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vue2TouchEvents)

Vue.directive('textJSON', {
	bind(el, binding) {
		try {
			const arrayValue = binding.value.split(".")
			let valueJSON = textPTBR[arrayValue[0]]
			for(let i = 1; i < arrayValue.length; i++) {
				valueJSON = valueJSON[arrayValue[i]]
			}
			el.innerHTML = valueJSON
		} catch(error) {
			console.log('ERRO NO textJSON:')
			console.log(error)
		}
	}

})
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
