const app = require('../../app.js')

module.exports = async table => {
    await app.db(table).truncate()
}