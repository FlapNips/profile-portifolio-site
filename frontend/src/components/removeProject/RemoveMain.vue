<template>
	<div id="layout-remove-main">
		<b-row class="list-layout" no-gutters>
			<b-col cols="6">
				#PROJETO
			</b-col>
			<b-col cols>
				teste
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#layout-remove-main {
	font-family: 'Bangers', cursive;
	font-size: 1.3em;
	height: 100vh;
	width: 100vw;
	overflow-x: hidden;
	display: grid;
	grid-template-rows: 3fr 80fr 3fr;
	grid-template-columns: 3fr 80fr 3fr;
	grid-template-areas:	"margin-top margin-top margin-top"
							"margin-middle-left content-main margin-middle-right"
							"margin-bottom margin-bottom margin-bottom";
	.list-layout {
		grid-area: content-main;
		border: 2px solid black;
		height: max-content;
		background-color: white;
	
	}
}
</style>