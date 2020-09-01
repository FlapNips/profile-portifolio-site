const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in DELETE - PROJECTS.', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one contact to tests.
        await factory.create('Project')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_projects')
    })

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .delete('/project/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when project not exists', async () => {
        const response = await request(app)
            .delete('/project/2')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Projeto não encontrado.')
    })
})
describe('Delete - PROJECTS', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one project to tests.
        await factory.create('Project')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_projects')
    })
    it('Should success delete project user.', async () => {
        const response = await request(app)
            .delete('/project/1')
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Deletado com sucesso.')
    })

})