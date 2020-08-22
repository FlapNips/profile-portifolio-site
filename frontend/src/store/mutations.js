
const mutations = {
		setTitle(state, payload) {
			state.project.title = payload
		},
		setLevel(state, payload) {
			state.project.level = parseInt(payload)
		},
		setIntroduction(state, payload) {
			state.project.introduction = payload
		},
		setLearning(state, payload) {
			state.project.learning = payload
		},
		setDate(state, payload) {
			state.project.date = payload
		},
		setFile(state, payload) {
			state.project.file = payload
		},
		addIcon(state, payload) {
			state.project.icons.push(payload)
		},
		removeIcon(state, payload) {
			const index = state.project.icons.indexOf(payload)
			if(index > -1) state.project.icons.splice(index, 1)
		},
		resetAll(state) {
			state.project.title = ''
			state.project.level = 1
			state.project.introduction = ''
			state.project.learning = ''
			state.project.date = ''
			state.project.file = null
		},
		resetImage(state) {
			state.project.file = null
		},
    updateWidthWindow(state, width) {
      state.windowWidth = width
    },
    changeSidebarVisible(state, value) {
			if(value != undefined) {
				state.sidebarVisible = value
			} else {
      state.sidebarVisible = !state.sidebarVisible
			}
    },
		setMenu(state, value) {
			state.menu = value
		},
		setDropdownMenu(state, value) {
			state.menu.find(x => x.id === 'manager').submenu = value
		},
		setComponentManager(state, value) {
			state.componentManager = value
		},
		setManagerProfileTechnology(state, value) {
			state.managerProfileTechnology = { ...value }
		},
		//Experience
		setListButtons(state, value) {
			state.listButtons = value
		},
		setPageExperience(state, value) {
			state.pageExperience = value
		}
}

export default mutations