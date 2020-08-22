const multerConfig = require('./../config/multer.js')
const multer = require('multer')
const upload = multer(multerConfig).single('file')

module.exports = app => {

//-----------------USERS---------------------------------
	app.route('/user')
		.post(app.api.users.addUser)
	app.route('/user/:user_id')
		.get(app.api.users.getUser)
		.put(app.api.users.updateUser)
		.delete(app.api.users.deleteUser)
//-----------------USERS CONTACT-------------------------
	app.route('/contact/:user_id')
		.post(app.api.usersContact.addContact)
		.get(app.api.usersContact.getContact)
		.put(app.api.usersContact.updateContact)
//-----------------EXPERIENCES--------------------------
	app.route('/experience/user/:user_id')
		.post(app.api.usersExperiences.addExperience)
		.get(app.api.usersExperiences.getExperienceUser)
	app.route('/totalexperience/user/:user_id')
		.get(app.api.usersExperiences.totalExperienceUser)

	app.route('/experience/:experience_id')
		.get(app.api.usersExperiences.getExperience)
		.put(app.api.usersExperiences.updateExperience)
		.delete(app.api.usersExperiences.deleteExperience)
//-----------------SKILLS--------------------------------
	app.route('/skill')
		.post(
			upload,
			app.api.skills.addSkill
		)
	app.route('/skill/user/:user_id')
		.post(app.api.skills.addSkillUser)
		.get(app.api.skills.getSkillUser)

	app.route('/skill/image/:skill_id')
		.get(app.api.skills.getSkillImage)
	app.route('/skill/experience/:experience_id')
		.get(app.api.skills.getSkillsExperience)

	app.route('/skill/:skill_id')
		.get(app.api.skills.getSkillData)
		.put(
			upload,
			app.api.skills.updateSkill
		)
		.delete(app.api.skills.deleteSkill)
//-----------------PROJECTS------------------------------
	app.route('/project/user/:user_id')
		.post(app.api.usersProjects.addProject)
		.get(app.api.usersProjects.getProjectsUser)

	app.route('/project/:project_id')
		.get(app.api.usersProjects.getProject)
		.put(app.api.usersProjects.updateProject)
		.delete(app.api.usersProjects.deleteProject)
}