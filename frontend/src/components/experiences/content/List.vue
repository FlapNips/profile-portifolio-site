<template>
  <b-row no-gutters>
    <b-col cols=12>

      <div
      id="title-activities" 
      class="separator px-5 mb-4">
        PRINCIPAIS ATIVIDADES
      </div>

      <div
      class="layout-list">

        <div
        v-for="item in newList"
        :key="item.key"
        class="list-line">
            <b-row 
            no-gutters 
            class="py-2 my-1" 
            :style="styleList(item.key)">

              <b-col 
              cols=1
              class="column-item">
                <div class="number-list">
                  {{ parseInt(item.key) + 1 }}
                </div>
              </b-col>

              <b-col cols=11 class="content-list">
                {{ item.value }}
              </b-col>

            </b-row>

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
    },
    data() {
      return {
        newList: {},
      }
    },
    methods: { 
      styleList(key) {
        if(key %2 == 0) {
          return [
            'background-color: rgba(175, 220, 255, 0.5);',
            'border-radius: 50px;'
          ]
        } else {
          return [
            'background-color: rgba(165, 200, 245, 0.5);',
            'border-radius: 50px'
          ]
        }

      }
    },
    beforeMount() {
      this.newList = Object.entries(this.list).map(element => {
        const [key, value] = element
        return {
          key,
          value
        }
      })
    }
  }
</script>

<style lang="scss">

  .layout-list {
    max-width: 100%;
    margin: 0 2em;
    padding: 0 1em 1em 1em;
    min-height: 2em;
    border-radius: 1em;


    .list-line {
      line-height: 1.4em;
      font-family: 'victoria-serif';
      font-size: 1em;


      .column-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;


        .number-list {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          height: 100%;

          height: 2em;
          width: 2em;
          margin: 0;

          border-radius: 50%;
          background-color: $color_blue_5;
          color: white;
        }
      }
      .content-list {
        padding: 0 0.5em 0 0.5em;
        text-align: justify;
        text-indent: 30px;
      }
    }
  }
</style>