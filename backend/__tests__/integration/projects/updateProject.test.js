const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in UPDATE - PROJECTS.', () => {
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
            .put('/project/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when project not exists', async () => {
        const response = await request(app)
            .put('/project/2')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Nenhum projeto encontrado.')
    })

    it('Should failed when SKILLS not is Array format', async () => {
        const project = await factory.build('Project', {
            skills: 'NOT IS ARRAY FORMAT'
        })

        const response = await request(app)
            .put('/project/1')
            .send(project)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('SKILLS precisa ser um Array.')
    })

    it('Should failed when LIST not is Array format', async () => {
        const project = await factory.build('Project', {
            list: 'NOT IS ARRAY FORMAT'
        })

        const response = await request(app)
            .put('/project/1')
            .send(project)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('LIST precisa ser um Array.')
    })

    it('Should failed when not exits field to update', async () => {
        const response = await request(app)
            .put('/project/1')
            .send({})
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Precisa de ao menos um campo preenchido para atualizar.')
    })

    it('Should failed when field is empty to update', async () => {
        const contact = {
            title: ''
        }
        const response = await request(app)
            .put('/project/1')
            .send(contact)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode haver campos em branco.')
    })
})
describe('Update - PROJECTS', () => {
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
        await truncate('tbx_skills_projects')
    })
    it('Should success update project user.', async () => {

        const project = {
            title: 'CHANGE TITLE.',
            skills: [1,5]
        }

        const response = await request(app)
            .put('/project/1')
            .send(project)
        

        expect(response.status).toBe(200)
        expect(response.text).toBe('Atualizado com sucesso.')
    })

})