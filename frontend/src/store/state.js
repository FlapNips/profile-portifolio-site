const state = {
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
		managerProfileTechnology: null
}

export default state