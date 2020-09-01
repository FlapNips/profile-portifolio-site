const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in GET - PROJECT.', () => {
    beforeEach(async () => {
        //API projectS need an user.
        await factory.create('User')
        //Need one project to tests.
        await factory.create('Project')
        await factory.create('SkillsXProjects')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_projects')
        await truncate('tbx_skills_projects')
    })

    it('Should failed in attempt to get a project with PARAM not number.', async () => {
        
        const response = await request(app)
            .get('/project/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed in attempt to get a project with USER not exists.', async () => {

        const response = await request(app)
            .get('/project/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Nenhum projeto encontrado.')
    })
   
})
describe('Get - PROJECT.', () => {
    beforeEach(async () => {
        //API projectS need an user.
        await factory.create('User')
        //Need one project to tests.
        await factory.create('Project')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_projects')
    })

    it('Should success in attempt of get a project for the user.', async () => {
        const response = await request(app)
            .get('/project/1')

        expect(response.status).toBe(200)
    })
})
