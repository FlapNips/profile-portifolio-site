const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in POST - EDUCATIONS.', () => {
    beforeEach(async () => {
        //API educationS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_educations')
    })

    it('Should failed in attempt to create an education with PARAM not number.', async () => {
        
        const response = await request(app)
            .post('/education/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed in attempt to create an education with USER not exists.', async () => {

        const response = await request(app)
            .post('/education/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Usuário não existe.')
    })

    it('Should failed in attempt to create an education with any field empty.', async () => {
        const education = await factory.build('Education', {
            title: ''
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode existir campos vazios.')
    })

    it('Should failed in attempt to create an education with field TITLE undefined.', async () => {
        const education = await factory.build('Education', {
            title: undefined
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira um título.')
    })

    it('Should failed in attempt to create an education with field DURATION undefined.', async () => {
        const education = await factory.build('Education', {
            duration: undefined
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a duração.')
    })

    it('Should failed in attempt to create an education with field DURATION not number.', async () => {
        const education = await factory.build('Education', {
            duration: 'NOT IS DURATION FORMAT'
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Apenas números.')
    })

    it('Should failed in attempt to create an education with field DATE_START undefined.', async () => {
        const education = await factory.build('Education', {
            date_start: undefined
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de início.')
    })

    it('Should failed in attempt to create an education with field DATE_START not date format.', async () => {
        const education = await factory.build('Education', {
            date_start: 'NOT IS DATE FORMAT'
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de início válida.')
    })

    it('Should failed in attempt to create an education with field DATE_FINISH undefined.', async () => {
        const education = await factory.build('Education', {
            date_finish: undefined
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de finalização.')
    })

    it('Should failed in attempt to create an education with field DATE_FINISH not date format.', async () => {
        const education = await factory.build('Education', {
            date_finish: 'NOT IS DATE FORMAT'
        })

        const response = await request(app)
            .post('/education/1')
            .send(education)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira a data de finalização válida.')
    })
   
})
describe('Create - EDUCATIONS.', () => {
    beforeEach(async () => {
        //API educationS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_educations')
    })

    it('Should success in attempty to create an education.', async () => {
        const education = await factory.build('Education')

        const response = await request(app)
            .post('/education/1')
            .send(education)
        
        expect(response.status).toBe(201)
        expect(response.text).toBe('Criado com sucesso.')
    })

})