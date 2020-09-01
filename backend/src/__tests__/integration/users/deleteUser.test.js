const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in DELETE - USERS.', () => {
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
    })

    it('Should failed when param is not number.', async () => {

        const response = await request(app)
            .delete('/user/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when delete user not exists.', async () => {
        const response = await request(app)
            .delete('/user/1')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Usuário não existe.')
    })

})
describe('Delete - USER', () => {
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
    })
    it('Should success when delete user exists.', async () => {
        await factory.create('User')

        const response = await request(app)
            .delete('/user/1')
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Todas as informações deste perfil foram excluidos.')
    })
})
