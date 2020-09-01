<template>
  <b-row no-gutters class="layout-header">
    <b-col cols=3>
      <b-img src="@/assets/example.svg" class="image"/>
    </b-col>

    <b-col cols=9 class="px-2">
      <div class="layout-title">
        {{ header.title }}
      </div>
      <div class="layout-office">
        {{ header.subtitle }}
      </div>

      <div class="mt-3">
        <slot style="position: absolute; left: 0;"></slot>

        <span 
        style="position: absolute; right: 0;"
        class="layout-contract">
          {{ header.contract }}
        </span>
      </div>
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

  .layout-header {
    height: 10em;
    .image {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      padding: 1em;
      max-height: 100%;
      max-width: 100%;
      height: 10em;
      width: 10em;
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