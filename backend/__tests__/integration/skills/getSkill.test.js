const request = require('supertest')
const app = require(process.cwd() + '/src/app.js')
const fs = require('fs')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in GET - SKILL.', () => {
    beforeEach(async () => {
        //API skill need an user.
        await factory.create('User')

        //Need one skill to tests.
        const skill = await factory.build('Skill')
        await factory.create('Skill', {
            ...skill,
            fileName: `1_${skill.title}.png`
        })
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_skills')
    })

    it('Should failed in attempt to get an experience with PARAM not number.', async () => {
        
        const response = await request(app)
            .get('/skill/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser numérico.')
    })

    it('Should failed in attempt to get an experience with USER not exists.', async () => {

        const response = await request(app)
            .get('/skill/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Habilidade não encontrada.')
    })
   
})
describe('Get - SKILL.', () => {
    beforeEach(async () => {
        //API experienceS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_skills')
    })

    it('Should success in attempt of get an experience for the user.', async () => {
        const skill = await factory.build('Skill')

        await factory.create('Skill', {
            ...skill,
            fileName: `1_${skill.title}.png`
        })

        //* Create file for the getter.
        const fileName = await app.db('tb_skills').first().then( x => x.fileName)
        const pathFile = `${process.cwd()}/__tests__/integration/skills/images/${fileName}`
        fs.writeFileSync(pathFile, 'CONTENT EXAMPLE')
        
        const response = await request(app)
            .get('/skill/1')
        
        //* Remove file created.
        fs.unlinkSync(pathFile)

        expect(response.status).toBe(200)
    })
})
