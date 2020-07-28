const state = {
		icons: {
			html5     : require('@/assets/icons/html5-icon.svg'),
			css3      : require('@/assets/icons/css3-icon.svg'),
			sass      : require('@/assets/icons/sass-icon.svg'),
			javascript: require('@/assets/icons/javascript-icon.svg'),
			vuejs     : require('@/assets/icons/vuejs-icon.svg'),
			bootstrap : require('@/assets/icons/bootstrap-icon.svg'),
			nodejs    : require('@/assets/icons/nodejs-icon.svg'),
			api       : require('@/assets/icons/api-icon.svg'),
			json      : require('@/assets/icons/json-icon.svg'),
			mysql     : require('@/assets/icons/mysql-icon.svg'),
			psql      : require('@/assets/icons/postgresql-icon.svg'),
			firebase  : require('@/assets/icons/firebase-icon.svg'),
			docker    : require('@/assets/icons/docker-icon.svg'),
			empty     : require('@/assets/icons/empty-icon.svg'),
		},
		project: {
			title       : '',
			level       : 1,
			introduction: '',
			learning    : '',
			date        : '',
			file        : null,
			icons       : []
		},
    windowWidth: null,
    sidebarVisible: false
}

export default state