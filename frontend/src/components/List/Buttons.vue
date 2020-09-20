<template>
  <b-col cols=12 class="pt-4">
    <transition name="fade">

      <div v-if="loading" class="m-0 p-0">
        <b-row
        no-gutters
        v-for="(button, index) in listButtons"
        :key="button.id"
        @click="buttonSelected(index)"
        :class="{ buttonSelected: buttonSelected === button.id,
          buttonEmpty: button.id === undefined
        }"
        class="layout-button">

            <b-col v-if="button.id" cols=9 class="layout-text">
              <h3>{{ button.title }}</h3>
              <h4>{{ button.subtitle }}</h4>
              <h4 class="date-button">{{ dateStart(button.dateStart, button.dateFinish) }}</h4>
            </b-col>

            <b-col v-if="button.id" cols=3 class="layout-content-image">
              <b-img src="@/assets/example.svg" class="image"/>
            </b-col>

        </b-row>
      </div>

    </transition>

    <b-pagination-nav
    base-url="#"
    use-router
    align="center"
    class="pages"
    limit=3
    :pills="true"
    hide-goto-end-buttons
    :number-of-pages="5"/>

  </b-col>
</template>

<script>


    export default {
        props: {
            listButtons: {
            type: Array,
            required: true
            }
        },
        computed: {
            loading() {
            return this.listButtons.length !== 0
            }
        },
        methods: {
            dateStart(dateStartString, dateFinishString) {

                const dateStart = new Date(dateStartString)
                const dateFinish = new Date(dateFinishString)

                return `${dateStart.getMonth()}/${dateStart.getFullYear()} - 
                    ${dateFinish.getMonth()}/${dateFinish.getFullYear()}`
                },
                buttonSelected(buttonIndex) {
                this.$emit('button-selected', buttonIndex)
            }
        }
    }
</script>

<style lang="scss" scoped>
  .layout-button {

    height: 100px;
    width: 100%;

    margin: 0.5em 0;
    border-radius: 1em;
    padding: 0.5em 0.5em 0 0.5em;

    color: black;
    cursor: pointer;

    .layout-text {
      h3 {
        font-size: 1.5em!important;
        font-family: 'victoria';
        line-height: 1;
        margin: 0.5em 0;
      }
      h4 {
        font-size: 0.7em!important;
        line-height: 1;
        margin: 0.5em 0;
      }
    }
    .date-button {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      text-align: center;
      margin: 0 0 0.5em 0;
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
    background-color: $color_blue_7;
  }
  .buttonSelected {
    background-color: rgb(219, 239, 252);
  }
  .buttonEmpty {
    width: 0;
    cursor: unset;
    padding: 0;
  }
  .page {
    width: 100%;
  
  }
</style>