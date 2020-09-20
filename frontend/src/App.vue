<template>
		<router-view v-if="render"></router-view>
</template>
<script>
	export default {
		methods: {
			widthWindow() {
				this.$store.commit('widthWindow', innerWidth)
			}
		},
		computed: {
			render() {
				const user = Object.keys(this.$store.getters.user)
				const contact = Object.keys(this.$store.getters.userContact)

				if (user.length > 0 && contact.length > 0) {
					return true
				} else {
					return false
				}
			},
			getUserId() {
				return this.$store.getters.userId
			}
		},
		async beforeMount() {
			this.$store.commit('widthWindow', window.innerWidth)
			window.addEventListener('resize', this.widthWindow)

			//*Set informations the User.
			await this.$http.get(`/user/${this.getUserId}`).then( x => {
				this.$store.commit('user', x.data)
			})

			//*Set contact the User.
			await this.$http.get(`/contact/${this.getUserId}`).then( x => {
				this.$store.commit('userContact', x.data)
			})
		},
		destroyed() {
			window.removeEventListener('resize', this.widthWindow)
		}
	}
</script>
<style lang="scss">
	body {
		font-family: 'Noto Sans JP', sans-serif;
	}
</style>