const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in UPDATE - EXPERIENCE.', () => {
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

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .put('/experience/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when experience not exists', async () => {
        const response = await request(app)
            .put('/experience/2')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Nenhuma experiência encontrada.')
    })

    it('Should failed when SKILLS not is Array format', async () => {
        const experience = await factory.build('Experience', {
            skills: 'NOT IS ARRAY FORMAT'
        })

        const response = await request(app)
            .put('/experience/1')
            .send(experience)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('SKILLS precisa ser um Array.')
    })

    it('Should failed when LIST not is Array format', async () => {
        const experience = await factory.build('Experience', {
            list: 'NOT IS ARRAY FORMAT'
        })

        const response = await request(app)
            .put('/experience/1')
            .send(experience)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('LIST precisa ser um Array.')
    })

    it('Should failed when not exits field to update', async () => {
        const response = await request(app)
            .put('/experience/1')
            .send({})
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Precisa de ao menos um campo preenchido para atualizar.')
    })

    it('Should failed when field is empty to update', async () => {
        const experience = {
            title: ''
        }
        const response = await request(app)
            .put('/experience/1')
            .send(experience)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode haver campos em branco.')
    })
})
describe('Update - EXPERIENCE', () => {
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
        await truncate('tbx_skills_experiences')
    })
    it('Should success update experience user.', async () => {

        const experience = {
            title: 'CHANGE TITLE.',
            skills: [1,5]
        }

        const response = await request(app)
            .put('/experience/1')
            .send(experience)
        

        expect(response.status).toBe(200)
        expect(response.text).toBe('Atualizado com sucesso.')
    })

})