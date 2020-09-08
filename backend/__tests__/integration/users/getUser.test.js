const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in GET - USERS.', () => {
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
    })

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .get('/user/a')
        
        expect(response.status).toBe(404)
        expect(response.text).toBe('O parâmetro precisa ser numérico.')
    })

    it('Should failed when user not exists', async () => {
        const response = await request(app)
            .get('/user/1')
        
        expect(response.status).toBe(404)
        expect(response.text).toBe('Usuário não encontrado!')
    })
})

describe('Get - USERS.', () => {
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
    })
    
    it('Should successful when get user exist', async () => {
        const user = await factory.build('User')
        await factory.create('User', user)

        const userCreated = await app.db('tb_users').first()

        const response = await request(app)
            .get('/user/1')
        
        expect(response.status).toBe(200)
    })
})
