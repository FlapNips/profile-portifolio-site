<template>
  <span
  align-h="end"
  no-gutters>
    {{ dateStartTransform }} - {{ dateFinishTransform }}
  </span>
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
    },
    computed: {
      dateStartTransform() {
        const data = new Date(this.dateStart)
        return `${data.getMonth()}/${data.getFullYear()}`
      },
      dateFinishTransform() {
        const data = new Date(this.dateFinish)
        return `${data.getMonth()}/${data.getFullYear()}`
      }
    }
  }
</script>