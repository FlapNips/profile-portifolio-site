<template>
	<div id="layout-add-project">
		<b-row class="content-area">
			<b-col id="content-form-layout" cols="6" class="p-3 h-100">
				<b-form>
					<FormInput/>
					<FormTextArea/>
					<FormDatepicker/>
				</b-form>
			</b-col>
			<b-col cols="6">
				<SelectTechnology/>
			</b-col>
		</b-row>
	</div>
</template>

<script>

import FormInput from './form/FormInput.vue'
import FormTextArea from './form/FormTextArea.vue'
import FormDatepicker from './form/FormDatepicker.vue'
import SelectTechnology from './SelectTechnology.vue'

export default {
	components: {
		FormInput,
		FormTextArea,
		FormDatepicker,
		SelectTechnology
	},
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
#layout-add-project {
	font-family: 'Bangers', cursive;
	font-size: 1.3em;
	height: 100vh;
	width: 100vw;
	overflow-x: hidden;
	display: grid;
	grid-template-rows: 3fr 80fr 3fr;
	grid-template-columns: 3fr 80fr 3fr;
	grid-template-areas:	"margin-top margin-top margin-top"
							"margin-middle-left conteudo margin-middle-right"
							"margin-bottom margin-bottom margin-bottom";
	.content-area { 
		grid-area: conteudo; 
		#content-form-layout {
			border-radius: 1em;
			background-color: #578ab3;
		}
	}
}

</style>