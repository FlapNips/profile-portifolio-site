<template>
	<div>
		<b-form-file
		placeholder="Arraste a imagem até aqui ou clique em escolher."
		drop-placeholder="Solte a imagem aqui !"
		v-model="file"
		class="my-3">
		</b-form-file>
	</div>
</template>

<script>
export default {
	data() {
		return {
			file: null
		
		}
	}
}
</script>

<style lang="scss">
.custom-file-input:lang(en) ~ .custom-file-label::after {
	content: 'ESCOLHER';
}
.button-reset {
	background-color: rgb(63, 63, 63);
}
</style>