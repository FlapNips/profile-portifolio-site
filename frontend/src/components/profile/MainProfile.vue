<template>
	<div id="layout-profile-main" class="p-4">
		<div id="layout-personal-profile">
			<b-img id="image-profile" src="@/assets/logo.png"/>
			<div id="contact-profile" v-textJSON="`profile.teste.teste2.teste3`">
			</div>
			<div id="aboutme-profile">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aspernatur officia voluptates dolor. Dolore quidem tempore, soluta qui magni doloremque sit sint exercitationem, ab consequatur rem distinctio tenetur perspiciatis fugit.
			</div>
			<div id="full-name-profile">
				<div>BRUNO ALFIERI</div>
				<div>Developer Web</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#layout-profile-main {
	background-color: rgb(197, 197, 197);
	width: 100vw;
	min-height: 100vh;
	#layout-personal-profile {
		width: 100%;
		height: 300px;
		display: grid;
		grid-template-areas:	"image-profile contact contact about-me"
								"full-name full-name social social";
		grid-template-rows: 5fr 2fr;
		grid-template-columns: 2fr 3fr 3fr 6fr;
	}
	#image-profile {
		grid-area: image-profile;
	}
	#contact-profile {
		grid-area: contact;
	}
	#aboutme-profile {
		grid-area: about-me;
	}
	#full-name-profile {
		grid-area: full-name;
		font-size: 2em;
	}
}
</style>