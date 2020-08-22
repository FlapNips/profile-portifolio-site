const state = {
		//Global
		user: {
			userId: null,
		},
		menu: null,
		/* MENU EXAMPLE
		{
			id: menu_id,
			router: router_menu,
			title: title_menu,
			submenu: [
				{
					id: id_item,
					component: component_item,
					title: title_item
				}
			]
		}
		*/
		componentManager: 'profile',
    windowWidth: null, //in px
    sidebarVisible: false, // windowWidth < 1200px
		managerProfileTechnology: null,
		//EXPERIENCE
		listButtons: [],
		pageExperience: 1
}

export default state