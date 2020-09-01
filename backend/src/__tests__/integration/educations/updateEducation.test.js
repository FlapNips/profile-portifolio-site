const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in UPDATE - CONTACTS.', () => {
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
            .put('/education/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when education not exists', async () => {
        const response = await request(app)
            .put('/education/2')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Educação não encontrada.')
    })

    it('Should failed when not exits field to update', async () => {
        const response = await request(app)
            .put('/education/1')
            .send({})
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Precisa de ao menos um campo preenchido para atualizar.')
    })

    it('Should failed when field is empty to update', async () => {
        const contact = {
            title: ''
        }
        const response = await request(app)
            .put('/education/1')
            .send(contact)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode haver campos em branco.')
    })
})
describe('Update - EDUCATIONS', () => {
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
    it('Should success update education user.', async () => {

        const education = {
            title: 'CHANGE TITLE.'
        }

        const response = await request(app)
            .put('/education/1')
            .send(education)
        
        const educationAfterUpdate = await app.db('tb_educations').first()

        expect(response.status).toBe(200)
        expect(response.text).toBe('Atualizado com sucesso.')
        expect(educationAfterUpdate.title).toBe('CHANGE TITLE.')
    })

})