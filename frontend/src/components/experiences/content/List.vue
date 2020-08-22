<template>
  <b-row no-gutters>
    <b-col cols=12>
      <div class="separator px-5">PRINCIPAIS ATIVIDADES</div>
      <div
      class="layout-list">
        <div
        v-for="(item, index) in list"
        :key="item">
          {{ index + 1 }} - {{ item }}
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .layout-list {
    padding: 0 1em 1em 1em;
    min-height: 2em;
    margin: 0 2em;
  }
</style>