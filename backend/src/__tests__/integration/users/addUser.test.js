const request = require('supertest')
const app = require('../../../app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')

describe('Validator fields undefined', () => {
    afterEach(async () => {
        truncate('tb_users')
    })
    // afterAll(async () => {
    //     await app.queryBuilder().destroy()
    
    // })

    it('An attempt to create an user with USERNAME field undefined', async () => {
        const user = await factory.build('User', {
            username: undefined
        })
        
        console.log(user)
        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Insira o usuário.')
    })

    it('An attempt to create an user with FULLNAME field undefined', async () => {
        const user = await factory.build('User', {
            full_name: undefined
        })
        console.log(user)
        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Insira o nome completo.')
    })

    it('An attempt to create an user with PASSWORD field undefined', async () => {
        const user = await factory.build('User', {
            password: undefined
        })
        console.log(user)
        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Insira a senha.')
    })

    it('An attempt to create an user with PROFESSION field undefined', async () => {
        const user = await factory.build('User', {
            profession: undefined
        })

        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Qual sua profissão ?')
    })

    it('An attempt to create an user with ABOUT field undefined', async () => {
        const user = await factory.build('User', {
            about: undefined
        })

        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Escreva sobre você.')
    })

})
describe('Validator fields empty', () => {
    afterEach(async () => {
        truncate('tb_users')
    })
    // afterAll(async () => {
    //     await app.queryBuilder().destroy()
    
    // })

    it('An attempt to create an user with USERNAME field empty', async () => {
        const user = await factory.build('User', {
            username: ''
        })
        
        console.log(user)
        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Insira o usuário.')
    })

    it('An attempt to create an user with FULLNAME field empty', async () => {
        const user = await factory.build('User', {
            full_name: ''
        })
        console.log(user)
        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Insira o nome completo.')
    })

    it('An attempt to create an user with PASSWORD field empty', async () => {
        const user = await factory.build('User', {
            password: ''
        })
        console.log(user)
        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Insira a senha.')
    })

    it('An attempt to create an user with PROFESSION field empty', async () => {
        const user = await factory.build('User', {
            profession: ''
        })

        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Qual sua profissão ?')
    })

    it('An attempt to create an user with ABOUT field empty', async () => {
        const user = await factory.build('User', {
            about: ''
        })

        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Escreva sobre você.')
    })

})
describe('Create User', () => {
    afterEach(async () => 
        truncate('tb_users')
    )

    it('Should return failed when try create user with USERNAME exists', async () => {
        const user = await factory.build('User')
        await factory.create('User', user)

        const response = await request(app)
            .post('/user')
            .send(user)
        
        console.log(await app.db('tb_users'))
        console.log(user)
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Nome do perfil já cadastrado!')
    })

    it('Should return success when try create user with USERNAME not exists', async () => {
        const user = await factory.build('User')

        const response = await request(app)
            .post('/user')
            .send(user)
        console.log(user)
        expect(response.text).toBe('Perfil criado com sucesso!')
        expect(response.status).toBe(201)
    })

})

