<template>
  <b-sidebar
  ref="abc"
  :visible="getSidebarVisible"
  no-header-close
  no-close-on-esc
  no-close-on-backdrop>
    <b-nav id="sidebar-nav" vertical>
          <b-nav-item
          v-for="button in menu"
          :key="button.id"
          class="sidebar-nav-item"
          :to="button.router">
            {{ button.title }}
          </b-nav-item>
    </b-nav>
    <template v-slot:footer>
      <b-button @click.stop="changeVisibleSidebar" class="mb-1">FECHAR</b-button>
    </template>
  </b-sidebar>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true
    },
    changeVisibleSidebar: {
      type: Function,
      required: true
    }
  },
  computed: {
      getSidebarVisible() {
        return this.$store.getters.getSidebarVisible
      }
  },
}
</script>

<style lang="scss" scoped>
.b-sidebar {
  z-index: 1000!important;
  #sidebar-nav {
    .sidebar-nav-item {
      display: block;
      margin: 0.5em 2em;
      background-color: $color_blue_2;
    }
    a {
      color: $color_black_5;
    }
  }
}
</style>