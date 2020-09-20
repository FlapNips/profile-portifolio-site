import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: () => import('@/views/Home.vue'),
			children: [
				{
					path: '/profile',
					name: 'Perfil',
					component: () => import('@/views/Inside/Profile.vue'),
				},
				{
					path: '/experiences',
					name: 'Experiencias',
					component: () => import('@/views/Inside/Experiences.vue')
				},
				{
					path: '/projects',
					name: 'Projetos',
					component: () => import('@/views/Inside/Projects.vue')
				},
				{
					path: '/contact',
					name: 'Contato',
					component: () => import('@/views/Inside/Contact.vue')
				},
				{
					path: '/manager',
					name: 'Gerenciar',
					component: () => import('@/views/Inside/Manager.vue')
				}
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
