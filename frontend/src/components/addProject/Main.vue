<template>
	<div id="layout-add-project">
		<div class="content-area">
			<b-col cols="5" style="background-color: gray">
				<b-form>
					<b-form-group 
					v-for="(input, index) in formInput"
					:key="input.id"
					:label="labelList(index)"
					:label-for="input.id">
						<b-form-input 
							:id="input.id"
							:placeholder="input.placeholder"
							:type="input.type"
							min="1"
							max="5"
							v-model="input.value"
							class="my-3 ">
						</b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-textarea 
						v-for="inputTextArea in formTextArea"
						:key="inputTextArea.id"
						v-model="inputTextArea.content"
						rows="4"
						:state="inputTextArea.content.length >= 30 && inputTextArea.content.length <= 250"
						class="my-3">
						</b-form-textarea>
					</b-form-group>
				</b-form>
				<b-button @click="levelNow()">CLICK</b-button>
			</b-col>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formInput: [
				{	value: '',
					id: 'title',
					placeholder: 'Digite o título.',
					type: 'text',
					label: 'Título:'
				},
				{	value: 1,
					id: 'level',
					placeholder: 'level',
					type: 'range',
					label: `Level: naofoi`
				},
				{	value: '',
					id: 'preview',
					placeholder: 'Preview',
					type: 'text',
					label: 'Preview:'
				},
			],
			formTextArea: [
				{	content: '',
					id: 'introduction',
					placeholder: 'Introdução',
					min: 3,
					max: 5
				
				},
				{	content: '',
					id: 'knowledge',
					placeholder: 'Aprendido',
					min: 3,
					max: 5
				}
			
			]
		}
	},
	methods: {
		getLevel(level) {
			switch(level) {
				case 1: { return 'Newbie' }
				case 2: { return 'begginer' }
				case 3: { return 'Intermediate' }
				case 4: { return 'Advanced' }
				case 5: { return 'Expert' }
			}
		},
		labelList(index) {
			if(index == 1) {
				let valueRange = parseInt(this.formInput[index].value)
				return `Level: ${this.getLevel(valueRange)}`
			}
			return this.formInput[index].label
		},
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