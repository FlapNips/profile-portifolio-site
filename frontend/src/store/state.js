const state = {
		project: {
			title       : '',
			level       : 1,
			introduction: '',
			learning    : '',
			date        : '',
			file        : null,
			icons       : []
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
    windowWidth: null,
    sidebarVisible: false
}

export default state