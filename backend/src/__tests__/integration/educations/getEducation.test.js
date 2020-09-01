const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in GET - EDUCATIONS.', () => {
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

    it('Should failed in attempt to get a contact with PARAM not number.', async () => {
        
        const response = await request(app)
            .get('/education/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed in attempt to get a contact with USER not exists.', async () => {

        const response = await request(app)
            .get('/education/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Educação não encontrada.')
    })
   
})
describe('Get - EDUCATIONS.', () => {
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

    it('Should success in attempt of get a contact for the user.', async () => {
        const contact = await app.db('tb_educations').first()
        
        const response = await request(app)
            .get('/education/1')
        
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(contact)
    })

})
