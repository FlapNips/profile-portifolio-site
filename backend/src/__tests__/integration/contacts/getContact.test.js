const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields with request GET using the api CONTACTS.', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one contact to tests.
        await factory.create('Contact')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_contacts')
    })

    it('Should failed in attempt to get a contact with PARAM not number.', async () => {
        
        const response = await request(app)
            .get('/contact/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Parâmetro precisa ser númerico.')
    })

    it('Should failed in attempt to get a contact with USER not exists.', async () => {

        const response = await request(app)
            .get('/contact/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Usuário não existe.')
    })
   
})
describe('Get contact informations with request GET using the api CONTACTS.', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one contact to tests.
        await factory.create('Contact')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_contacts')
    })

    it('Should success in attempt of get a contact for the user.', async () => {
        const contact = await app.db('tb_contacts').first()
        
        const response = await request(app)
            .get('/contact/1')
        
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(contact)
    })

})
