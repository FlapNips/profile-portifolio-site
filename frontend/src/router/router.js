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
					component: () => import('@/views/Profile.vue'),
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
				{
					path: '/contact',
					name: 'Contato',
					component: () => import('@/views/Contact.vue')
				},
				{
					path: '/manager',
					name: 'Gerenciar',
					component: () => import('@/views/Manager.vue')
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
	console.log(to.meta)
	next()
})
export default router
