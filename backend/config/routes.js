module.exports = app => {

//-----------------ABOUT ME TECHNOLOGIES---------------
	app.route('/aboutmetechnologies')
		.get(app.api.aboutMeTechnologies.getAllTechnologies)
		.post(app.api.aboutMeTechnologies.addTechnologies)
//-----------------ABOUT ME----------------------------
	app.route('/aboutme')
		.put(app.api.aboutMe.updateAboutme)
		.get(app.api.aboutMe.getAboutme)
//-----------------EXPERIENCES-------------------------
	app.route('/experience')
		.post(app.api.experiences.addExperience)
		.put(app.api.experiences.updateExperience)

	app.route('/experience/:id')
		.get(app.api.experiences.getExperience)
		.delete(app.api.experiences.deleteExperience)
	
	app.route('/experiences')
		.get(app.api.experiences.getAllExperiences)
//-----------------ALL TECHNOLOGY----------------------
	app.route('/technology')
		.post(app.api.technologies.addTechnology)
		.put(app.api.technologies.updateTechnology)

	app.route('/technology/:id')
		.get(app.api.technologies.getTechnology)
		.delete(app.api.technologies.deleteTechnology)

	app.route('/alltechnologies')
		.get(app.api.technologies.getAllTechnologies)
//-----------------USERS-------------------------------
	app.route('/user')
		.post(app.api.users.addUser)
		.get(app.api.users.getUser)
		.put(app.api.users.updateUser)
	app.route('/user/:id')
		.delete(app.api.users.deleteUser)
}