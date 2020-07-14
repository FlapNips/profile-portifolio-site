<template>
	<div>
		<b-form-file
		placeholder="Arraste a imagem até aqui ou clique em escolher."
		drop-placeholder="Solte a imagem aqui !"
		accept=".jpeg, .png, .gif, .jpg"
		:state="validateFile(getFile)"
		:value="getFile"
		@input="commitFile($event)"
		class="mt-1">
		</b-form-file>
		<div id="warning-file-text" v-show="validateFile(getFile) === false" class="text-right">
			EXTENSÃO DE ARQUIVO NÃO ACEITO !
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			acceptExtension: [
				'jpeg',
				'gif',
				'jpg',
				'png'
			]
		
		}
	},
	computed: {
		getFile() {
			return this.$store.getters.getFile
		}
	},
	methods: {
		validateFile(file) {
			if(file == (null || undefined)) return undefined
			const fileName = file.name
			const extension = fileName.split('.').pop()
			try {
			this.acceptExtension.find(element => {
				if(element == extension) return true
			}).first
			} catch(error) {
				return false
			}
			return true
		},
		commitFile(file) {
			this.$store.commit('setFile', file)
		}
	}
}
</script>

<style lang="scss" scoped>
.custom-file-input:lang(en) ~ .custom-file-label::after {
	content: 'ESCOLHER';
}
#warning-file-text {
	font-size: 0.8em;
	color: rgb(122, 0, 0);
}
</style>