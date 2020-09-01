const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in DELETE - CONTACTS.', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one contact to tests.
        await factory.create('Education')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_educations')
    })

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .delete('/education/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when education not exists', async () => {
        const response = await request(app)
            .delete('/education/2')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Educação não encontrada.')
    })
})
describe('Delete - EDUCATIONS', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one education to tests.
        await factory.create('Education')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_educations')
    })
    it('Should success delete education user.', async () => {
        const response = await request(app)
            .delete('/education/1')
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Deletado com sucesso.')
    })

})