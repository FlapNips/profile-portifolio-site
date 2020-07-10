import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		icons: {
			vuejs: require('@/assets/vuejs-icon.svg'),
			javascript: require('@/assets/javascript-icon.svg'),
			api: require('@/assets/api-icon.svg'),
			nodejs: require('@/assets/nodejs-icon.svg'),
			mysql: require('@/assets/mysql-icon.svg'),
			psql: require('@/assets/postgresql-icon.svg'),
			firebase: require('@/assets/firebase-icon.svg'),
			bootstrap: require('@/assets/bootstrap-icon.svg'),
			docker: require('@/assets/docker-icon.svg'),
			html5: require('@/assets/html5-icon.svg'),
			css3: require('@/assets/css3-icon.svg'),
			sass: require('@/assets/sass-icon.svg'),
			json: require('@/assets/json-icon.svg'),
		}
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
