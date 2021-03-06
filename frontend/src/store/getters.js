export default {
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
		},
		getManagerProfileTechnology(state) {
			return state.managerProfileTechnology
		},
		//Experience
		getListButtons(state) {
			return state.listButtons
		},
		getPageExperience(state) {
			return state.pageExperience
		}
}