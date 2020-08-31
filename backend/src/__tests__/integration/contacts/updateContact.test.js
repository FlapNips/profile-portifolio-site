const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields with request PUT using the api CONTACTS.', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_contacts')
    })

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .put('/contact/a')
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when user not exists', async () => {
        const response = await request(app)
            .put('/contact/2')
        expect(response.status).toBe(406)
        expect(response.text).toBe('Usuário não encontrado.')
    })

    it('Should failed when not exits field to update', async () => {
        await factory.create('Contact')

        const response = await request(app)
            .put('/contact/1')
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Precisa de ao menos um campo preenchido para atualizar.')
    })

    it('Should failed when field is empty to update', async () => {
        await factory.create('Contact')

        const contact = {
            address: ''
        }
        
        const response = await request(app)
            .put('/contact/1')
            .send(contact)
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Não pode haver campos em branco.')
    })
})
describe('Check update the user contact with request PUT using the api CONTACTS', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_contacts')
    })
    it('Should success update contact user.', async () => {
        let contact = await factory.build('Contact')
        await factory.create('Contact', contact)

        contact.address = 'CHANGE ADDRESS.'

        const response = await request(app)
            .put('/contact/1')
            .send(contact)
        
        const contactAfterUpdate = await app.db('tb_contacts').first()

        expect(response.status).toBe(200)
        expect(response.text).toBe('Atualizado com sucesso.')
        expect(contactAfterUpdate.address).toBe(contact.address)
    })

})