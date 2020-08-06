<template>

	<b-row no-gutters class="h-100 p-3">

    <b-col cols="12" class="mt-1">
      <hr class="hr-text" data-content="Modos"/>
    </b-col>

    <b-col cols=6>
      <b-button 
      @click="manager = !manager"
      :style="manager === true ? 'background-color: red' : 'background-color: green'">
        Adicionar/Remover
      </b-button>
    </b-col>

    <!-- TECHNOLOGIES IN PROFILE -->
    <b-col cols="12" class="mt-1">
      <hr class="hr-text" data-content="Habilidades em Perfil"/>
    </b-col>


    <technologies-profile 
    :buttonsRegisted="buttonsRegisted"
    :tooltipButtons="tooltipButtons"
    :getLevel="getLevel"/>

    <!-- ALL TECHNOLOGIES -->
    <b-col cols="12" class="mt-1">
      <hr class="hr-text" data-content="Habilidades cadastradas"/>
    </b-col>

    <form-technologies-all/>

    <technologies-all 
    :buttonsNotRegisted="buttonsNotRegisted"
    :tooltipButtons="tooltipButtons"
    :getLevel="getLevel"/>


	</b-row>

</template>

<script>

  import TechnologiesProfile from './technology/TechnologiesProfile.vue'
  import TechnologiesAll from './technology/TechnologiesAll.vue'
  import FormTechnologiesAll from './technology/FormTechnologiesAll.vue'

export default {
  components: {
    TechnologiesProfile,
    TechnologiesAll,
    FormTechnologiesAll
  },
	data() {
		return {
      buttonsNotRegisted: [],
			buttonsRegisted: [],
      /* DEFAULT FORMAT
              [
        { icon: String,
          value: require('@/assets...'),
          pressed: Boolean  
        }
      ]
      */
      formTechnology: [
        { id: null,
          icon: null,
          file: null,
          img: null,
          percent: null

        }
      ],
      manager: false,
		}
	},
  computed: {
    getImg() {
      return this.formTechnology.img == null ? 
      require('@/assets/icons/empty-icon.svg') : 
      require(`@/assets/${this.formTechnology.img}`)
    },
    getManagerProfileTechnology() {
      return this.$store.getters.getManagerProfileTechnology
    }
  },
	methods: {
		getLevel(percent) {
			if(percent == 100) return 'Nível Experiente'
			if(percent > 75) return 'Nível Avançado'
			if(percent > 50) return 'Nível Intermediário'
			else return 'Nível Básico'
		},
    tooltipButtons(icon) {
      if(icon.percent) return `${icon.name} - ${icon.percent}%`
      else return icon.name
    },
		getIcons() {
			this.$http.get('/alltechnologies').then( res => {

        let allTechnologies = []

				res.data.forEach( element => {
					allTechnologies.push({
						'pressed': false,
						'name': element.icon,
						'value': require(`@/${element.img}`)
					})
				})
        this.defineIcons(allTechnologies)
			})
		},
    defineIcons(allTechnologies) {

      this.$http.get('/aboutmetechnologies').then( res => {

        allTechnologies.forEach( element => {
          if(res.data.some( x => x.icon === element.name)) {
            this.buttonsRegisted.push({
              name: element.name,
              percent: res.data.find( x => x.icon === element.name).percent,
              pressed: true,
              value: element.value
            })
          } else {
            this.buttonsNotRegisted.push(element)
          }
        })

      })
    }
	},
	created() {
		this.getIcons()
	}
}
</script>

<style lang="scss">

#buttons-layout {
  text-align: center;
  .button-selected {
    position: relative;
    box-shadow: 0 0 5px 2px black;
    opacity: 1!important;
  }
  .button-default {
    background-color: white;
    opacity: 0.5;
    height: 140px;
    width: 120px;
    .box-button {
      display: grid;
      position: relative;
      grid-template-rows: 110px 30px;
      .image-button {
        position: relative;
        margin: auto auto;
      }
      .percent-button {
        grid-area: 2/1;
        position: absolute;
        left: -1px;
        right: 0;

        width: calc(100% + 2px);

        border-radius: 0 0 0.25em 0.25em;

        height: 30px;
        margin: 0;

        background-color: black;
        color: white;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 0.8em;
        line-height: 30px;
      }
    }
  }

  .button-default:active,
  .button-default:hover,
  .button-default:focus {
    box-shadow: 0 0 5px 3px black;
    background-color: white
  }
}
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: .5;
  &:before {
    content: '';
    background: linear-gradient(to right, transparent, #1b1b19, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;

    padding: 0 .5em;
    line-height: 1.5em;
    color: black;
    background-color: #fcfcfa;
  }
}

</style>