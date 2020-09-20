<template>
    <b-row 
    no-gutters 
    align-h="center"
    class="layout-technologies">

        <Separator class="px-5 my-3">
            PRINCIPAIS APRENDIZADOS
        </Separator>

        <carousel
        :navigationEnabled="true"
        paginationActiveColor="rgb(0, 89, 255)"
        paginationColor="rgb(148, 186, 255)"
        :paginationSize="15"
        :perPage="4"
        class="layout-technologies">
            <slide
            v-for="image in skills"
            :key="image.id"
            :id="image.name"
            class="content-image">
                <b-img 
                :src="image.img"
                class="image"/>
                <b-tooltip :target="image.name" triggers="hover"
                placement="bottom">
                {{ image.name }}
                </b-tooltip>
            </slide>
        </carousel>
    </b-row>
</template>

<script>

    import Separator from '@/components/Separator/Default.vue'

  export default {
    components: {
        Separator
    },
    props: {
      skills: {
        type: Array,
        required: true
      }
    },
    beforeUpdate() {
      console.log(this.skills)
    }
  }
</script>

<style lang="scss">
  .layout-technologies {
    height: auto;
    width: 90%;
    margin: 0 auto;
    color: rgb(148, 186, 255);
    .content-image {
      text-align: center;
      .image {
        height: 6em;
        cursor: pointer;
      }
    }
  }
  .VueCarousel-navigation {
    position: absolute;
    top: 0;
    bottom: 50%;
    width: 100%;
  }
</style>