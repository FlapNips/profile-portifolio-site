const app = require(process.cwd() +'/src/app.js')

const factory = require('knex-factory')(app.db)
const faker = require('faker')

factory.define('User', 'tb_users', {
        username: async () => await faker.internet.userName(),
        password: async () => await faker.internet.password(),
        full_name: async () => await faker.name.findName(),
        profession: async () => await faker.name.jobTitle(),
        about: async () => await faker.lorem.paragraph(),
        avatar: 'Profile'
})

factory.define('Skill', 'tb_skills', {
        users_id: 1,
        title: async () => await faker.lorem.word(),
        //fileName: Define in build after create.
        percent: () => Math.round(Math.random() * 100),
})

factory.define('Contact', 'tb_contacts', {
        users_id: 1,
        address: async () => await faker.address.streetAddress(),
        phone: async () => await faker.random.number(),
        email: async () => await faker.internet.email(),
        github: async () => await faker.internet.url(),
        linkedin: async () => await faker.internet.url(),
        facebook: async () => await faker.internet.url(),
        update_time: new Date().toLocaleString()
})

factory.define('Education', 'tb_educations', {
        users_id: 1,
        title: async () => await faker.lorem.word(),
        duration: Math.round(Math.random() * 300),
        about: async () => await faker.lorem.paragraph(),
        date_start: async () => await faker.date.past(),
        date_finish: async () => await faker.date.future()
})

factory.define('Project', 'tb_projects', {
        users_id: 1,
        title: async () => await faker.lorem.word(),
        subtitle: async () => await faker.lorem.word(),
        about: async () => await faker.lorem.paragraph(),
        list: async () => {
                let result = []
                result.push(await faker.lorem.paragraphs())
                result.push(await faker.lorem.paragraphs())
                return result
        },
        link: async () => await faker.internet.url(),
        date_start: async () => await faker.date.past(),
        date_finish: async () => await faker.date.future()
})

factory.define('SkillsXProjects', 'tbx_skills_projects', {
        projects_id: 1,
        skills_id: [1,2,3]
})

factory.define('Experience', 'tb_experiences', {
        users_id: 1,
        title: async () => await faker.lorem.word(),
        subtitle: async () => await faker.lorem.word(),
        contract: async () => await faker.lorem.word(),
        about: async () => await faker.lorem.paragraph(),
        list: async () => {
                let result = []
                result.push(await faker.lorem.paragraphs())
                result.push(await faker.lorem.paragraphs())
                return result
        },
        image: async () => await faker.internet.url(),
        date_start: async () => await faker.date.past(),
        date_finish: async () => await faker.date.future()
})

factory.define('SkillsXExperiences', 'tbx_skills_experiences', {
        experiences_id: 1,
        skills_id: [1,2,3]
})


module.exports = factory