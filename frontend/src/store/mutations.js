
export default {
	//*Informations the User.
	user(state, user) {
		state.user = user
	},
	userContact(state, contact) {
		state.userContact = contact
	},


    widthWindow(state, width) {
      state.windowWidth = width
    },
    menuMobileVisible(state, value) {
		state.menuMobileVisible = value
    },
	menu(state, value) {
		state.menu = value
	},
	dropdownMenu(state, value) {
		state.menu.find(x => x.id === 'manager').submenu = value
	},
	componentManager(state, value) {
		state.componentManager = value
	},
	managerProfileTechnology(state, value) {
		state.managerProfileTechnology = { ...value }
	},
	//Experience
	listButtons(state, value) {
		state.listButtons = value
	},
	pageExperience(state, value) {
		state.pageExperience = value
	}
}