import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '',
			component: () => import('@/views/Main.vue'),
			children: [
				{
					path: '/profile',
					name: 'Perfil',
					component: () => import('@/pages/Profile.vue'),
				},
				{
					path: '/experiences',
					name: 'Experiencias',
					component: () => import('@/pages/Experiences.vue')
				},
				{
					path: '/projects',
					name: 'Projetos',
					component: () => import('@/pages/Projects.vue')
				},
				{
					path: '/contact',
					name: 'Contato',
					component: () => import('@/pages/Contact.vue')
				},
				{
					path: '/manager',
					name: 'Gerenciar',
					component: () => import('@/pages/Manager.vue')
				},
			]
		},
		{
			path: '',
			component: () => import('@/views/Login.vue'),
		},
		{
			path: '/page-not-found',
			component: () => import ('@/views/FullPage.vue')
		}
	]
})
router.beforeEach( (to, from, next) => {
	next()
})
export default router
