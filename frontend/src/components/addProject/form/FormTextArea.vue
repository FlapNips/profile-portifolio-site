<template>
	<div>
		<b-form-group
		v-for="inputTextArea in formTextArea"
		:key="inputTextArea.id"
		:label="inputTextArea.label"
		:label-for="inputTextArea.id">
			<b-form-textarea
			:id="inputTextArea.id"
			v-model="inputTextArea.content"
			:placeholder="inputTextArea.placeholder"
			:rows="inputTextArea.min"
			:state="inputTextArea.content.length >= 30 && inputTextArea.content.length <= 250"
			class="my-3 input-text-area"/>
		</b-form-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formTextArea: [
				{	content: '',
					label: 'Introdução:',
					id: 'introduction',
					placeholder: 'Entre 30 e 250 caracteres.',
					min: 5
				
				},
				{	content: '',
					label: 'Aprendizado:',
					id: 'knowledge',
					placeholder: 'Entre 30 e 250 caracteres.',
					min: 5
				}
			
			]
		}
	}
}
</script>

<style>
.input-text-area {
	width: 100%;
	height: 200px;

}
</style>