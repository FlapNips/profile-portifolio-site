import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		icons: {
			html5: require('@/assets/icons/html5-icon.svg'),
			css3: require('@/assets/icons/css3-icon.svg'),
			sass: require('@/assets/icons/sass-icon.svg'),
			javascript: require('@/assets/icons/javascript-icon.svg'),
			vuejs: require('@/assets/icons/vuejs-icon.svg'),
			bootstrap: require('@/assets/icons/bootstrap-icon.svg'),
			nodejs: require('@/assets/icons/nodejs-icon.svg'),
			api: require('@/assets/icons/api-icon.svg'),
			json: require('@/assets/icons/json-icon.svg'),
			mysql: require('@/assets/icons/mysql-icon.svg'),
			psql: require('@/assets/icons/postgresql-icon.svg'),
			firebase: require('@/assets/icons/firebase-icon.svg'),
			docker: require('@/assets/icons/docker-icon.svg'),
			empty: require('@/assets/icons/empty-icon.svg'),
		},
		project: {
			title: '',
			level: 1,
			introduction: '',
			learning: '',
			date: '',
			file: null,
			icons: []
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
		addIcon(state, payload) {
			state.project.icons.push(payload)
			console.log(state.project.icons)
		},
		removeIcon(state, payload) {
			const index = state.project.icons.indexOf(payload)
			if(index > -1) state.project.icons.splice(index, 1)
		},
		resetAll(state) {
			state.project.title = ''
			state.project.level = 1
			state.project.introduction = ''
			state.project.learning = ''
			state.project.date = ''
			state.project.file = null
		},
		resetImage(state) {
			state.project.file = null
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
