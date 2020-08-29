const app = require('../app.js')


const factory = require('knex-factory')(app.db)
const faker = require('faker')


factory.define('User', 'tb_users', {
    username: () => faker.internet.userName(),
    password: () => faker.internet.password(),
    full_name: () => faker.name.findName(),
    profession: () => faker.name.jobTitle(),
    about: () => faker.lorem.paragraph(),
    avatar: 'Profile'
})

module.exports = factory