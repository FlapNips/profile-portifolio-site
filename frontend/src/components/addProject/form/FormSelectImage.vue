<template>
	<div>
		<b-form-file
		placeholder="Arraste a imagem até aqui ou clique em escolher."
		drop-placeholder="Solte a imagem aqui !"
		accept=".jpeg, .png, .gif, .jpg"
		v-model="file"
		:state="validateFile(file)"
		class="mt-1">
		</b-form-file>
		<div id="warning-file-text" v-show="validateFile(file) === false" class="text-right">
			EXTENSÃO DE ARQUIVO NÃO ACEITO !
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			file: null,
			acceptExtension: [
				'jpeg',
				'gif',
				'jpg',
				'png'
			]
		
		}
	},
	methods: {
		validateFile(file) {
			if(file === (undefined || null)) return null
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