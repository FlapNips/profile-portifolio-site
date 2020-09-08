const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in DELETE - EXPERIENCE.', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one contact to tests.
        await factory.create('Experience')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_experiences')
    })

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .delete('/experience/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser numérico.')
    })

    it('Should failed when experience not exists', async () => {
        const response = await request(app)
            .delete('/experience/2')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Experiência não encontrada.')
    })
})
describe('Delete - EXPERIENCE', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one experience to tests.
        await factory.create('Experience')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_experiences')
    })
    it('Should success delete experience user.', async () => {
        const response = await request(app)
            .delete('/experience/1')
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Deletado com sucesso.')
    })

})