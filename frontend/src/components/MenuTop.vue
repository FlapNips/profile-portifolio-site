<template>
	<div id="layout-menu-top" no-gutters align-h="between">
		<b-row id="row-menu" no-gutters>
			<b-col
			cols="12"
			class="layout-menu"
			v-for="button in menu"
			:key="button.id">
				<b-link
				:to="button.router">
					<div class="box">
						<h3 v-textJSON="`menu.${button.id}`" class="text-button"/>
					</div>
				</b-link>
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
					router: "/profile",
				},
				{	id: "experience",
					router: "/experiences"
				},
				{	id: "projects",
					router: "/projects"
				},
				{	id: "contact",
					router: "/contact"
				},
				{	id: "login",
					router: "/login",
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
@media only screen and (min-width: 1200px) {
	#row-menu {
		transform: skewX(-20deg);
	}
	.layout-menu {
		flex     : 0 0 20%;
		max-width: 20%;
	}
}
@media only screen and (max-width: 1199px) {
	.text-button {
		transform: skewX(0deg)!important;
	}

}
#row-menu {
	grid-area       : 1/2;
	background-color: $color_blue_2;  //COLOR BACKGROUND BUTTONS
	justify-content : space-between;
}
#layout-menu-top {
	display              : grid;
	height               : max-content;
	padding-top          : 30px;
	padding-bottom       : 30px;
	width                : 100%;
	grid-template-columns: 2fr 5fr 2fr;
	background-color     : $color_black_4;  //COLOR BACKGROUND MENUTOP
	.layout-menu {
		width        : 100%;
		height       : 50px;
		border-radius: 0;
		border       : 0;
		padding      : 0;
		text-align   : center;
		.router-link-active {
			background-color: $color_black_1;  //COLOR BACKGROUND ROUTER LINK ACTIVE
		}
		.box {
			transform       : skewX(0deg);
			background-color: inherit;
			.text-button {
				font-size       : 1em;
				line-height     : 50px;
				transform       : skewX(20deg);
				text-decoration : none;
				background-color: transparent;
				color           : $color_black_4;  //COLOR TEXT MENU TOP
				}
			}
		:hover {
			background-color: $color_blue_1;  //MENU HOVER BACKGROUND COLOR
		}
	}
}

</style>