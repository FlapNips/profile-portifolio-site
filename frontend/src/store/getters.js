
const getters = {
		getTitle(state) {
			return state.project.title
		},
		getLevel(state) {
			return state.project.level
		},
		getIntroduction(state) {
			return state.project.introduction
		},
		getLearning(state) {
			return state.project.learning
		},
		getDate(state) {
			return state.project.date
		},
		getFile(state) {
			return state.project.file
		},
		getIcon: state => icon => {
			return state.icons[icon]
		},
    getWindowWidth(state) {
      return state.windowWidth
    },
    getSidebarVisible(state) {
      return state.sidebarVisible
    },
		getMenu(state) {
			return state.menu
		},
		getComponentManager(state) {
			return state.componentManager
		}
}

export default getters