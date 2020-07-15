<template>
	<div id="layout-menu-top" no-gutters align-h="between">
		<b-row id="layout-menu" align-h="between">
			<b-col
			v-for="button in menu" 
			:key="button.id"
			class="button-menu"
			@click="pushRouter(button.router)"
			:style="button.style">
				<div v-textJSON="`menu.${button.id}`"
				class="text-button"/>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			menu: [
				{	id: "profile",
					router: "/foi",
					style:	'border-radius: 25px 0 0 25px;'
				},
				{	id: "experience",
					router: ""
				},
				{	id: "projects",
					router: ""
				},
				{	id: "contact",
					router: ""
				},
				{	id: "login",
					router: "",
					style: 'border-radius: 0 25px 25px 0;'
				}
			]
		}
	},
	methods: {
		pushRouter(router) {
			return this.$router.push(router)
		}
	
	}
}
</script>

<style lang="scss" scoped>
#layout-menu-top {
	display: grid;
	height: max-content;
	padding-top: 30px;
	padding-bottom: 30px;
	width: 100%;
	background-color: rgb(209, 209, 209);
	grid-template-columns: 2fr 5fr 2fr;
	#layout-menu {
		grid-area: 1/2;
		border-radius: 50px;
		background-color: rgb(81, 11, 122);
		.button-menu {
			min-width: 130px;
			width: 20%;
			height: 50px;
			cursor: pointer;
			line-height: 50px;
			color: white;
			text-align: center;
			border-radius: 0;
			border: 0;
			padding: 0;
			background-color: transparent;
			&:hover {
				background-color: rgb(52, 5, 80);
			}
	}
	}
}
</style>