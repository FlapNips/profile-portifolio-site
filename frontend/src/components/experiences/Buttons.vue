<template>
  <b-col cols=12>
    <b-row
    no-gutters
    v-for="(button) in buttons"
    :key="button.id"
    @click="clickButton(button.id); buttonSelected = button.id"
    :class="{ buttonSelected: buttonSelected === button.id }"
    class="layout-button">

      <b-col cols=9 class="layout-text">
        <h3>{{ button.title }}</h3>
        <h4>{{ button.subtitle }}</h4>
      </b-col>

      <b-col cols=3 class="layout-content-image">
        <b-img src="@/assets/example.svg" class="image"/>
      </b-col>

    </b-row>

  </b-col>
</template>

<script>


export default {
  props: {
    buttons: {
      type: Array,
      required: true
    },
    clickButton: {
      type: Function,
      required: true
    },
    buttonSelected: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout-button {
    height: 100px;
    width: 100%;
    color: black;
    cursor: pointer;
    .layout-text {
      h3 {
        font-size: 1.5em!important;
      }
      h4 {
        font-size: 1em!important;
      }
    }
    .layout-content-image {
      height: 100%;
      .image {
        height: 100%;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        padding: 0.5em;
      }
    }
  }
  .layout-button:hover {
    background-color: rgb(167, 167, 167)!important;
  }
  .buttonSelected {
    background-color: red;
  }
</style>