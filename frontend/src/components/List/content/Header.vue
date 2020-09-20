<template>
    <b-row 
    no-gutters 
    class="layout-header">
    
        <b-col 
        sm=3
        cols=12
        class="column-image">
            <b-img 
            src="@/assets/example.svg"/>
        </b-col>

        <b-col 
        sm=9
        cols=12
        class="px-2">
            <div class="layout-title">
                {{ header.title }}
            </div>

            <div class="layout-office">
                {{ header.subtitle }}
            </div>

            <b-row 
            no-gutters
            class="mt-3">
                <!-- //*Date started - Date finished -->
                <b-col
                sm=6
                cols=12
                class="text-center">
                    <slot></slot>
                </b-col>

                <b-col 
                sm=6
                cols=12
                class="layout-contract text-center m-0">
                    {{ header.contract }}
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    props: {
      header: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">

    @media screen and (max-width: 576px){
        .layout-title {
            font-size: 1.5em!important;
        }
    }

  .layout-header {
    min-height: 10em;
    height: max-content;
    justify-content: center;

    .column-image {
      position: relative;
      margin: auto;
      padding: 1em;
      max-height: 10em;
      max-width: 10em;
      height: 100%;
      width: 100%;
    }
    .layout-title {
      border-bottom: 2px solid $color_black_1;
      margin: 0.5em 0.5em 0 0.5em;
      font-family: 'Apollo';
      font-size: 2em;
      line-height: 1;
      text-align: center;
      bottom: 0;
      padding: 0;
    }
    .layout-office {
      text-align: center;
    
    }
    .layout-contract {
      margin: 0 1em 0 0;
    }
  }
</style>