<template>
  <b-row no-gutters>    
    <div class="separator px-5">SOBRE A EXPERIÊNCIA</div>
    <div class="layout-about">
      <p>{{ about }}</p>
    </div>
  </b-row>
</template>

<script>
  export default {
    props: {
      about: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss">

  .layout-about {
    margin: 2em;
  }
</style>