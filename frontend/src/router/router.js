import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

	const routes = [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/components/home/Main.vue')
		},
		{
			path: '/add',
			name: 'AddProject',
			component: () => import('@/components/addProject/Main.vue')
		},
		{
			path: '/remove',
			name: 'RemoveProject',
			component: () => import('@/components/removeProject/Main.vue')
		}
	]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
