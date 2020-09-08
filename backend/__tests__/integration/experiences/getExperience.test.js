const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in GET - EXPERIENCE.', () => {
    beforeEach(async () => {
        //API experiences need an user.
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

    it('Should failed in attempt to get an experience with PARAM not number.', async () => {
        
        const response = await request(app)
            .get('/experience/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser numérico.')
    })

    it('Should failed in attempt to get an experience with USER not exists.', async () => {

        const response = await request(app)
            .get('/experience/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Experiência não encontrada.')
    })
   
})
describe('Get - EXPERIENCE.', () => {
    beforeEach(async () => {
        //API experienceS need an user.
        await factory.create('User')
        //Need one experience to tests.
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_experiences')
        await truncate('tbx_skills_experiences')
    })

    it('Should success in attempt of get an experience for the user.', async () => {
        await factory.create('Experience')
    
        const response = await request(app)
            .get('/experience/1')

        expect(response.status).toBe(200)
    })
})
