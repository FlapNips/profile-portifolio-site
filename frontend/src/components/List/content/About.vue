<template>
    <b-row no-gutters>  

        <Separator>
            SOBRE A EXPERIÊNCIA
        </Separator>

        <div class="layout-about">
            <p>{{ about }}</p>
        </div>
    </b-row>
</template>

<script>
    import Separator from '@/components/Separator/Default.vue'
  export default {
    components: {
        Separator
    },
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