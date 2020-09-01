<template>
  <div 
  class="loading">
    <b-spinner label="Loading..." class="loading-img"/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
	.loading {
		grid-area: content-area;
		display: flex;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.loading-img {
			margin: auto;
			color: black;
			width: 5em;
			height: 5em;
		
		}
	}
</style>