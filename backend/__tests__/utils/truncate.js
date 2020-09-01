const app = require(process.cwd() +'/src/app.js')

module.exports = async table => {
    await app.db(table).truncate()
}