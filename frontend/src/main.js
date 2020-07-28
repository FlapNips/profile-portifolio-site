import Vue from 'vue'
import './plugins/axios'
import VueCarousel from 'vue-carousel'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import textPTBR from '../public/textPTBR.json'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(VueCarousel)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
