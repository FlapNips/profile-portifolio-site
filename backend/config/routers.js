module.exports = app => {
	app.route('/teste')
		.get(app.api.aboutMeTechnologies.getTechnologies)
		.post(app.api.aboutMeTechnologies.addTechnologies)
	app.route('/alltechnologies')
		.get(app.api.allTechnologies.getAllTechnologies)
	app.route('/experiences')
		.get(app.api.experiences.getExperiences)
}