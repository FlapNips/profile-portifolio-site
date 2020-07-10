import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

	const routes = [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/components/home/HomeMain.vue')
		},
		{
			path: '/add',
			name: 'AddProject',
			component: () => import('@/components/addProject/AddMain.vue')
		},
		{
			path: '/remove',
			name: 'RemoveProject',
			component: () => import('@/components/removeProject/RemoveMain.vue')
		}
	]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
