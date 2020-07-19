<template>
	<b-row id="layout-aboutme">
		<b-col cols="12" lg="3" id="content-image-profile">
			<b-img src="@/assets/profile.png" class="image-profile"/>
			<div v-textJSON="'profile.fullname'" class="aboutme-fullname"/>
		</b-col>
		<b-col cols="12" lg="9" id="content-aboutme">
			<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quasi officiis nostrum suscipit vitae quis nam, aperiam natus dolorem rem quas aspernatur voluptatibus corporis itaque numquam voluptas sequi qui. Debitis.
			</p>
			<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure dicta reiciendis id quam accusamus voluptatem ab, laboriosam quas tenetur tempora hic, dolores illo asperiores nostrum? Soluta adipisci fuga officia dolorem.
			</p>
		</b-col>
	</b-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#layout-aboutme {
	grid-area: content-area;
	border-top: rgb(86, 11, 116) 5px solid;
	padding: 1em 0 1em 0;
	#content-image-profile {
		min-height: 100%;
		padding: 0.5em;
		text-align: center;
		.image-profile {
			width: 100%;
			max-width: 200px;
			min-width: 120px;
			clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);
		}
	}
	#content-aboutme {
		min-height: 100%;
		border-left: rgb(86, 11, 116) 1px solid;
		padding-left: 1em;
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}
	.aboutme-fullname {
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		width: 100%;
		text-align: center;
		line-height: 2;
		font-size: 1.3em;
	}
}
</style>