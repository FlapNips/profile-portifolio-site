<template>
	<div id="layout-add-project">
		<b-row class="content-area">
			<b-col cols="6" style="background-color: gray" class="p-3 h-100">
				<b-form>
					<FormInput/>
					<FormTextArea/>
				</b-form>
			</b-col>
			<b-col cols="6">
				tyersfgsa
			</b-col>
		</b-row>
	</div>
</template>

<script>

import FormInput from './FormInput.vue'
import FormTextArea from './FormTextArea.vue'

export default {
	components: {
		FormInput,
		FormTextArea
	},
}
</script>


<style lang="scss" scoped>
#layout-add-project {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	display: grid;
	grid-template-rows: 3fr 80fr 3fr;
	grid-template-columns: 3fr 80fr 3fr;
	grid-template-areas:	"margin-top margin-top margin-top"
							"margin-middle-left conteudo margin-middle-right"
							"margin-bottom margin-bottom margin-bottom";
	.content-area { 
		grid-area: conteudo; 
		background-color: green;
	}
}
</style>