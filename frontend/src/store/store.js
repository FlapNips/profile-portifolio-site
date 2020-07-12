import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		icons: {
			html5: require('@/assets/html5-icon.svg'),
			css3: require('@/assets/css3-icon.svg'),
			sass: require('@/assets/sass-icon.svg'),
			javascript: require('@/assets/javascript-icon.svg'),
			vuejs: require('@/assets/vuejs-icon.svg'),
			bootstrap: require('@/assets/bootstrap-icon.svg'),
			nodejs: require('@/assets/nodejs-icon.svg'),
			api: require('@/assets/api-icon.svg'),
			json: require('@/assets/json-icon.svg'),
			mysql: require('@/assets/mysql-icon.svg'),
			psql: require('@/assets/postgresql-icon.svg'),
			firebase: require('@/assets/firebase-icon.svg'),
			docker: require('@/assets/docker-icon.svg'),
			empty: require('@/assets/empty-icon.svg'),
		},
		project: {
			title: '',
			level: 1,
			introduction: '',
			learning: '',
			date: '',
			file: []
		}
	},
	mutations: {
		setTitle(state, payload) {
			state.project.title = payload
		},
		setLevel(state, payload) {
			state.project.level = parseInt(payload)
		},
		setIntroduction(state, payload) {
			state.project.introduction = payload
		},
		setLearning(state, payload) {
			state.project.learning = payload
		},
		setDate(state, payload) {
			state.project.date = payload
		},
		setFile(state, payload) {
			state.project.file = payload
		},
		resetAll(state) {
			state.project.title = ''
			state.project.level = 1
			state.project.introduction = ''
			state.project.learning = ''
			state.project.date = ''
			state.project.file = []
		}
	},
	actions: {
	},
	getters: {
		getTitle(state) {
			return state.project.title
		},
		getLevel(state) {
			return state.project.level
		},
		getIntroduction(state) {
			return state.project.introduction
		},
		getLearning(state) {
			return state.project.learning
		},
		getDate(state) {
			return state.project.date
		},
		getFile(state) {
			return state.project.file
		},
	}
})
