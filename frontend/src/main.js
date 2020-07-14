import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import textPTBR from './textPTBR.json'

Vue.config.productionTip = false

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
