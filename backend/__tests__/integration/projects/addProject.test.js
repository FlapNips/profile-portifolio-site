const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields - PROJECTS.', () => {
    beforeEach(async () => {
        //API projectS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_projects')
    })

    it('Should failed in attempt to create a project with PARAM not number.', async () => {
        
        const response = await request(app)
            .post('/project/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser numérico.')
    })

    it('Should failed in attempt to create a project with USER not exists.', async () => {
        const response = await request(app)
            .post('/project/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Usuário não existe.')
    })

    it('Should failed in attempt to create a project with any field empty.', async () => {
        const project = await factory.build('Project', {
            title: ''
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode existir campos vazios.')
    })

    it('Should failed in attempt to create a project with field TITLE is undefined.', async () => {
        const project = await factory.build('Project', {
            title: undefined
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira um título.')
    })

    it('Should failed in attempt to create a project with field SUBTITLE is undefined.', async () => {
        const project = await factory.build('Project', {
            subtitle: undefined
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira um subtítulo.')
    })

    it('Should failed in attempt to create a project with field LIST is undefined.', async () => {
        const project = await factory.build('Project', {
            list: undefined
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Escreva as principais atividades.')
    })

    it('Should failed in attempt to create a project with field LIST not is Array.', async () => {
        const project = await factory.build('Project', {
            list: 'LIST IS NOT ARRAY'
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('LIST deve ser um Array.')
    })

    it('Should failed in attempt to create a project with field SKILLS is undefined.', async () => {
        const project = await factory.build('Project', {
            skills: undefined
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Defina pelo menos uma habilidade.')
    })

    it('Should failed in attempt to create a project with field SKILLS not is Array.', async () => {
        const project = await factory.build('Project', {
            skills: 'SKILLS IS NOT ARRAY'
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('SKILLS deve ser um Array.')
    })

    it('Should failed in attempt to create a project with field ABOUT is undefined.', async () => {
        const project = await factory.build('Project', {
            about: undefined,
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Escreva um pouco sobre o projeto.')
    })

    it('Should failed in attempt to create a project with field DATE_START is undefined.', async () => {
        const project = await factory.build('Project', {
            date_start: undefined,
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de início.')
    })

    it('Should failed in attempt to create a project with field DATE_START not is date format.', async () => {
        const project = await factory.build('Project', {
            date_start: 'NOT IS DATE FORMAT',
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira uma data de início válida.')
    })

    it('Should failed in attempt to create an project with field DATE_FINISH is undefined.', async () => {
        const project = await factory.build('Project', {
            date_finish: undefined,
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de finalização.')
    })

    it('Should failed in attempt to create an project with field DATE_FINISH not is date format.', async () => {
        const project = await factory.build('Project', {
            date_finish: 'NOT IS DATE FORMAT',
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira uma data de finalização válida.')
    })
})
describe('Create - PROJECTS.', () => {
    beforeEach(async () => {
        //API projectS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_projects')
        await truncate('tbx_skills_projects')
    })

    it('Should success in attempty to create an project.', async () => {
        const project = await factory.build('Project', {
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/project/1')
            .send(project)
                
        expect(response.status).toBe(201)
        expect(response.text).toBe('Criado com sucesso.')
    })

})