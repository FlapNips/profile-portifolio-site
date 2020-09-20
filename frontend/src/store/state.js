const state = {
	
	//Global
	userId: 1,
	user: {},
	userContact: {},
	menu: [
		{
			id: 'profile',
			title: 'Perfil',
			to: '/profile',
			submenu: []
		},
		{
			id: 'experiences',
			title: 'Experiências',
			to: '/experiences',
			submenu: []
		},
		{
			id: 'projects',
			title: 'Projetos',
			to: '/projects',
			submenu: []
		},
		{
			id: 'manager',
			title: 'Gerenciar',
			to: '/manager',
			submenu: []
		}
	],
    menuMobileVisible: false, // windowWidth < 1200px
	componentManager: 'profile',
    windowWidth: null, //in px
	managerProfileTechnology: null,

	//EXPERIENCE
	listButtons: [],
	pageExperience: 1
}

export default state