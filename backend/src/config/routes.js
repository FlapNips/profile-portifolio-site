const multerConfig = require('./../config/multer.js')
const multer = require('multer')
const upload = multer(multerConfig).single('file')

module.exports = app => {

//!-----------------USERS---------------------------------

	app.route('/user')
		.post(app.api.users.addUser)
	app.route('/user/:user_id')
		.get(app.api.users.getUser)
		.put(app.api.users.updateUser)
		.delete(app.api.users.deleteUser)
//!-----------------CONTACTS-------------------------
	app.route('/contact/:user_id')
		.post(app.api.contacts.addContact)
		.get(app.api.contacts.getContact)
		.put(app.api.contacts.updateContact)
//!-----------------EDUCATIONS-------------------------
	app.route('/education/:user_id')
		.post(app.api.educations.addEducation)
	app.route('/education/:education_id')
		.get(app.api.educations.getEducation)
		.put(app.api.educations.updateEducation)
		.delete(app.api.educations.deleteEducation)
//!-----------------PROJECTS------------------------------
	app.route('/project/:user_id')
		.post(app.api.projects.addProject)

	app.route('/project/:project_id')
		.get(app.api.projects.getProject)
		.put(app.api.projects.updateProject)
		.delete(app.api.projects.deleteProject)

//!-----------------EXPERIENCES------------------------------
	app.route('/experience/:user_id')
		.post(app.api.experiences.addExperience)

	app.route('/experience/:experience_id')
		.get(app.api.experiences.getExperience, (req,res,next) => {
			console.log('pasou aqui')
			console.log(req,body)
			next()
		})
		.put(app.api.experiences.updateExperience)
		.delete(app.api.experiences.deleteExperience)
//!-----------------SKILLS--------------------------------
 	app.route('/skill/:user_id')
 		.post(
			upload,
 			app.api.skills.addSkill
 		)
	app.route('/skill/:skill_id')
		.get(app.api.skills.getSkill)
		.put(upload, app.api.skills.updateSkill)
		.delete(app.api.skills.deleteSkill)
// 	app.route('/skill/user/:user_id')
// 		.post(app.api.skills.addSkillUser)

// 	app.route('/skill/image/:skill_id')
// 		.get(app.api.skills.getSkillImage)
// 	app.route('/skill/experience/:experience_id')
// 		.get(app.api.skills.getSkillsExperience)

// 	app.route('/skill/:skill_id')
// 		.get(app.api.skills.getSkillData)
// 		.put(
// 			upload,
// 			app.api.skills.updateSkill
// 		)
}