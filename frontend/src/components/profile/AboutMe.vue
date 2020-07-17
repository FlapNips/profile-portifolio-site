<template>
	<b-col
	cols="9"
	id="layout-aboutme">
		<b-col id="content-image-profile">
			<b-img src="@/assets/profile.png" class="image-profile"/>
			<div v-textJSON="'profile.fullname'" class="aboutme-fullname"/>
		</b-col>
		<b-col id="content-aboutme">
			<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quasi officiis nostrum suscipit vitae quis nam, aperiam natus dolorem rem quas aspernatur voluptatibus corporis itaque numquam voluptas sequi qui. Debitis.
			</p>
			<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure dicta reiciendis id quam accusamus voluptatem ab, laboriosam quas tenetur tempora hic, dolores illo asperiores nostrum? Soluta adipisci fuga officia dolorem.
			</p>
		</b-col>
	</b-col>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#layout-aboutme {
	grid-area: content-area;
	display: grid;
	grid-template-columns: 2fr 5fr;
	grid-template-rows: max-content;
	border-top: rgb(86, 11, 116) 5px solid;
	padding: 1em 0 1em 0;
	#content-image-profile {
		grid-area: 1/1;
		min-height: 100%;
		padding: 0.5em;
		.image-profile {
			width: 100%;
			min-width: 120px;
			clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);
		}
	}
	#content-aboutme {
		grid-area: 1/2;
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