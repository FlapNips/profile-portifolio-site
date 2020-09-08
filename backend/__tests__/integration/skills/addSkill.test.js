const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')
const fs = require('fs')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields - SKILL.', () => {
    beforeEach(async () => {
        //API skillS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_skills')
    })

    it('Should failed in attempt to create a skill with PARAM not number.', async () => {
        
        const response = await request(app)
            .post('/skill/a')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser numérico.')
    })

    it('Should failed in attempt to create a skill with USER not exists.', async () => {
        const response = await request(app)
            .post('/skill/2')
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Usuário não existe.')
    })

    it('Should failed in attempt to create a skill with TITLE field empty.', async () => {
        const skill = await factory.build('Skill', {
            title: ''
        })

        const response = await request(app)
            .post('/skill/1')
            .field(skill)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Defina um título.')
    })

    it('Should failed in attempt to create a skill with skill already exists.', async () => {
        const skill = await factory.build('Skill')
        
        await factory.create('Skill', {
            ...skill,
            fileName: `1_${skill.title}.png`
        })

        const response = await request(app)
            .post('/skill/1')
            .field(skill)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Habilidade já cadastrada.')
    })

    it('Should failed in attempt to create a skill with field FILE is undefined.', async () => {
        const skill = await factory.build('Skill')

        const response = await request(app)
            .post('/skill/1')
            .field(skill)
                
        expect(response.status).toBe(400)
        expect(response.text).toBe('Escolha uma imagem.')
    })
})
describe('Create - SKILLS.', () => {
    beforeEach(async () => {
        //API skillS need an user.
        await factory.create('User')
    })
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_skills')
    })

    it('Should success in attempty to create a skill.', async () => {
        const skill = await factory.build('Skill')

        //* Create file for the upload.
        const filePath = `${__dirname}/images/1_${skill.title}.png`
        fs.writeFileSync(filePath, 'Content Test')

        const response = await request(app)
            .post('/skill/1')
            .field(skill)
            .attach('file', filePath)
        
        //* Remove file created.
        fs.unlinkSync(filePath)
                
        expect(response.status).toBe(201)
        expect(response.text).toBe('Criado com sucesso.')
    })

})