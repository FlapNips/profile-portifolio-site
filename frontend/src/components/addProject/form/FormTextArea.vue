<template>
	<div>
		<b-form-group
		v-for="(inputTextArea, index) in formTextArea"
		:key="inputTextArea.id">
			<label :for="inputTextArea.id">
				{{ inputTextArea.label }}
			</label>
			<b-form-textarea
			:id="inputTextArea.id"
			v-model="formTextArea[index].content"
			:placeholder="inputTextArea.placeholder"
			@input="commitAttribute(index, $event)"
			:rows="inputTextArea.min"
			:state="30 <= warningLimitText(inputTextArea.id) && warningLimitText(inputTextArea.id) <= 250"
			class="mt-1 input-text-area"/>
				<div class="count-caracters text-right mt-1">
					{{ getLength(inputTextArea.id) }} caracteres
				</div>
		</b-form-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formTextArea: [
				{	label: 'Introdução: ',
					lengthContent: 0,
					id: 'Introduction',
					placeholder: 'Entre 30 e 250 caracteres.',
					min: 5
				
				},
				{	label: 'Aprendizado: ',
					lengthContent: 0,
					id: 'Learning',
					placeholder: 'Entre 30 e 250 caracteres.',
					min: 5
				}
			
			]
		}
	},
	methods: {
		commitAttribute(index, value) {
			const textArea = this.formTextArea
			this.$store.commit( `set${textArea[index].id}`, value)
		},
		warningLimitText(id) {
			const textAreaLength = eval(`this.$store.getters.get${id}.length`)
			return textAreaLength
		},
		getLength(id) {
			return this.warningLimitText(id)
		}
	}
}
</script>

<style lang="scss" scoped>
.count-caracters {
	font-size: 0.6em;
}
</style>