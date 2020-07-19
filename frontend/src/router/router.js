import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

	const routes = [
		{
			path: '/profile',
			name: 'Perfil',
			component: () => import('@/views/Profile.vue')
		},
		{
			path: '/experiences',
			name: 'Experiencias',
			component: () => import('@/views/Experiences.vue')
		},
		{
			path: '/projects',
			name: 'Projetos',
			component: () => import('@/views/Projects.vue')
		},
	]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
