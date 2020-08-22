<template>
  <b-row
  class="mr-3"
  align-h="end"
  no-gutters>
    {{ dateStart }} - {{ dateFinish }}
  </b-row>
</template>

<script>
  export default {
    props: {
      dateStart: {
        type: String,
        required: true
      },
      dateFinish: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>

</style>