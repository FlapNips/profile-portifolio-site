const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields with request POST using the api CONTACTS.', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_contacts')
    })

    it('Should failed in attempt to create a contact with PARAM not number.', async () => {
        
        
        const response = await request(app)
            .post('/contact/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Parâmetro precisa ser númerico.')
    })

    it('Should failed in attempt to create a contact with USER not exists.', async () => {

        const response = await request(app)
            .post('/contact/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Usuário não existe.')
    })

    it('Should failed in attempt to create a contact with CONTACT exists.', async () => {
        const contact = await factory.create('Contact')

        const response = await request(app)
            .post('/contact/1')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Informação já criada. Atualize.')
    })

    it('Should failed in attempt to create a contact with FIELD empty.', async () => {
        const contact = await factory.build('Contact', {
            address: ''
        })

        const response = await request(app)
            .post('/contact/1')
            .send(contact)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode existir campos vazios.')
    })

    it('Should failed in attempt to create a contact with FIELD ADDRESS is undefined.', async () => {
        const contact = await factory.build('Contact', {
            address: undefined
        })

        const response = await request(app)
            .post('/contact/1')
            .send(contact)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira o endereço.')
    })

    it('Should failed in attempt to create a contact with FIELD PHONE is undefined.', async () => {
        const contact = await factory.build('Contact', {
            phone: undefined
        })

        const response = await request(app)
            .post('/contact/1')
            .send(contact)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira o celular.')
    })

    it('Should failed in attempt to create a contact with FIELD PHONE not is a number.', async () => {
        const contact = await factory.build('Contact', {
            phone: 'abcd'
        })

        const response = await request(app)
            .post('/contact/1')
            .send(contact)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O celular deve ter apenas números.')
    })

    it('Should failed in attempt to create a contact with FIELD EMAIL is undefined.', async () => {
        const contact = await factory.build('Contact', {
            email: undefined
        })

        const response = await request(app)
            .post('/contact/1')
            .send(contact)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Insira o email.')
    })

   
})
describe('Create contact with request POST using the api CONTACTS.', () => {
    beforeEach(async () => {
    //API CONTACTS need an user.
    await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_contacts')
    })
    it('Should success in attempt of create a contact for the user.', async () => {
        const contact = await factory.build('Contact')

        const response = await request(app)
            .post('/contact/1')
            .send(contact)
        
        expect(response.status).toBe(201)
        expect(response.text).toBe('Informações criadas com sucesso.')
    })

})
