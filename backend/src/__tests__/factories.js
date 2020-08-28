const factory = require('factory-girl')
const faker = require('faker')

const User = require('../models/user')



    factory.define('User', User, {
        username: 'teste'
    })

module.exports = factory