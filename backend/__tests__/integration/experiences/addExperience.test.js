const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields - EXPERIENCES.', () => {
    beforeEach(async () => {
        //API experienceS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_experiences')
    })

    it('Should failed in attempt to create an experience with PARAM not number.', async () => {
        
        const response = await request(app)
            .post('/experience/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed in attempt to create an experience with USER not exists.', async () => {
        const response = await request(app)
            .post('/experience/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Usuário não existe.')
    })

    it('Should failed in attempt to create an experience with any field empty.', async () => {
        const experience = await factory.build('Experience', {
            title: ''
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode existir campos vazios.')
    })

    it('Should failed in attempt to create a experience with field TITLE is undefined.', async () => {
        const experience = await factory.build('Experience', {
            title: undefined
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira um título.')
    })

    it('Should failed in attempt to create a experience with field SUBTITLE is undefined.', async () => {
        const experience = await factory.build('Experience', {
            subtitle: undefined
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira um subtítulo.')
    })

    it('Should failed in attempt to create a experience with field LIST is undefined.', async () => {
        const experience = await factory.build('Experience', {
            list: undefined
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Escreva as principais atividades.')
    })

    it('Should failed in attempt to create a experience with field LIST not is Array.', async () => {
        const experience = await factory.build('Experience', {
            list: 'LIST IS NOT ARRAY'
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('LIST deve ser um Array.')
    })

    it('Should failed in attempt to create a experience with field SKILLS is undefined.', async () => {
        const experience = await factory.build('Experience', {
            skills: undefined
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Defina pelo menos uma habilidade.')
    })

    it('Should failed in attempt to create a experience with field SKILLS not is Array.', async () => {
        const experience = await factory.build('Experience', {
            skills: 'SKILLS IS NOT ARRAY'
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('SKILLS deve ser um Array.')
    })

    it('Should failed in attempt to create a experience with field ABOUT is undefined.', async () => {
        const experience = await factory.build('Experience', {
            about: undefined,
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Escreva um pouco sobre a experiência.')
    })

    it('Should failed in attempt to create a experience with field DATE_START is undefined.', async () => {
        const experience = await factory.build('Experience', {
            date_start: undefined,
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de início.')
    })

    it('Should failed in attempt to create a experience with field DATE_START not is date format.', async () => {
        const experience = await factory.build('Experience', {
            date_start: 'NOT IS DATE FORMAT',
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira uma data de início válida.')
    })

    it('Should failed in attempt to create an experience with field DATE_FINISH is undefined.', async () => {
        const experience = await factory.build('Experience', {
            date_finish: undefined,
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de finalização.')
    })

    it('Should failed in attempt to create an experience with field DATE_FINISH not is date format.', async () => {
        const experience = await factory.build('Experience', {
            date_finish: 'NOT IS DATE FORMAT',
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira uma data de finalização válida.')
    })
})
describe('Create - experienceS.', () => {
    beforeEach(async () => {
        //API experienceS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_experiences')
        await truncate('tbx_skills_experiences')
    })

    it('Should success in attempty to create an experience.', async () => {
        const experience = await factory.build('Experience', {
            skills: [1, 2, 3]
        })

        const response = await request(app)
            .post('/experience/1')
            .send(experience)
                
        expect(response.status).toBe(201)
        expect(response.text).toBe('Criado com sucesso.')
    })

})