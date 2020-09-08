const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')
const fs = require('fs')
const path = require('path')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Check fields in UPDATE - SKILLS.', () => {
    beforeEach(async () => {
        //API SKILLS need an user.
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

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .put('/skill/a')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('O parâmetro precisa ser numérico.')
    })

    it('Should failed when project not exists', async () => {
        const response = await request(app)
            .put('/skill/2')
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Habilidade não encontrada.')
    })

    it('Should failed when not exits field to update', async () => {
        const response = await request(app)
            .put('/skill/1')
            .field({})
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Precisa de ao menos um campo preenchido para atualizar.')
    })

    it('Should failed when field is empty to update', async () => {
        const skill = {
            title: ''
        }
        const response = await request(app)
            .put('/skill/1')
            .field(skill)
        
        expect(response.status).toBe(400)
        expect(response.text).toBe('Não pode haver campos em branco.')
    })
})
describe('Update - PROJECTS', () => {
    beforeEach(async () => {
        //API CONTACTS need an user.
        await factory.create('User')
        //Need one skill to tests.
        const skill = await factory.build('Skill')
        await factory.create('Skill', {
            ...skill,
            fileName: `1_${skill.title}.png`
        })
        const fileName = await app.db('tb_skills').first().then(x => x.fileName)
        fs.writeFileSync(__dirname + `/images/${fileName}`, 'Content Example BEFORE')
    })

    afterEach(async () => {
        //Remove images
        const fileName = await app.db('tb_skills').first().then(x => x.fileName)
        fs.unlinkSync(__dirname + `/images/${fileName}`)

        //Delete all information table after test.
        await truncate('tb_users')
        await truncate('tb_skills')
    })
    it('Should success update IMAGE and CONTENT of the skill.', async () => {
        const skill = {
            title: 'CHANGE TITLE',
            percent: 101
        }
            

        const pathFile = __dirname + `/images/tempImage.png`
        fs.writeFileSync(pathFile, 'Content Example AFTER')


        const response = await request(app)
            .put('/skill/1')
            .field(skill)
            .attach('file', pathFile)
        
        fs.unlinkSync(pathFile)
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Atualizado com sucesso.')
    })
    it('Should success only update TITLE and PERCENT of the skill.', async () => {
        const skill = {
            title: 'CHANGE TITLE',
            percent: 101
        }
        const response = await request(app)
            .put('/skill/1')
            .field(skill)
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Atualizado com sucesso.')
    })

    it('Should success only update FILE of the skill.', async () => {
        const pathFile = __dirname + `/images/tempImage.png`
        fs.writeFileSync(pathFile, 'Content Example AFTER')


        const response = await request(app)
            .put('/skill/1')
            .attach('file', pathFile)
        
        fs.unlinkSync(pathFile)
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Atualizado com sucesso.')
    })

})