<template>
	<div id="layout-add-project">
		<div class="content-area">
			<b-col cols="5" style="background-color: gray">
				<b-form>
					<b-form-group>
						<b-form-input 
							v-for="(input, index) in formInput"
							:key="input.placeholder"
							:placeholder="input.placeholder"
							:type="input.type"
							:min="input.min"
							:max="input.max"
							:value="input[index]">
						</b-form-input>
					</b-form-group>
				</b-form>
			</b-col>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formInput: [
				{	title: '',
					placeholder: 'Digite o título.',
					type: 'text'
				},
				{	level: '',
					placeholder: 'Nível de Dificuldade.',
					type: 'range',
					min: 0,
					max: 5
				},
				{	introduction: '',
					placeholder: 'Qual a introdução ?',
					type: 'textarea'
				},
				{	objective: '',
					placeholder: 'Qual o objetivo ?',
					type: ''
				},
				{	previewImg: '',
					placeholder: '',
					type: ''
				},
				{	router: '',
					placeholder: '',
					type: ''
				},
			]
		}
	}
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