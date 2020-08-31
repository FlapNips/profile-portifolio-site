const app = require('../app.js')

const factory = require('knex-factory')(app.db)
const faker = require('faker')

console.log(factory)

factory.define('User', 'tb_users', {
        username: async () => await faker.internet.userName(),
        password: async () => await faker.internet.password(),
        full_name: async () => await faker.name.findName(),
        profession: async () => await faker.name.jobTitle(),
        about: async () => await faker.lorem.paragraph(),
        avatar: 'Profile'
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
        duration: Math.random() * 300,
        about: async () => await faker.lorem.paragraph(),
        date_start: async () => await faker.date.past(),
        date_finish: async () => await faker.date.future()
})


module.exports = factory