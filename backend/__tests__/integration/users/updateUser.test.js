const request = require('supertest')
const app = require(process.cwd() +'/src/app.js')

const factory = require('../../factories.js')
const truncate = require('../../utils/truncate')
const bcrypt = require('bcrypt')

describe('Check fields in UPDATE - USERS.', () => {
    afterEach(async () => {
        //Delete all information table after test.
        await truncate('tb_users')
    })

    it('Should failed when param not is number', async () => {
        const response = await request(app)
            .put('/user/a')
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('O parâmetro precisa ser númerico.')
    })

    it('Should failed when user not exists', async () => {
        const response = await request(app)
            .put('/user/1')
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Usuário não encontrado.')
    })

    it('Should failed when not field to update', async () => {
        await factory.create('User')
        
        const response = await request(app)
            .put('/user/1')
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Precisa de ao menos um campo preenchido para atualizar.')
    })

    it('Should failed when field FULLNAME is empty', async () => {
        let user = await factory.build('User')
        await factory.create('User', {
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        })

        user.fullname = ''

        const response = await request(app)
            .put('/user/1')
            .send(user)
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Não deixe campos vazios.')
    })

    it('Should failed when field PASSWORD is exists and NEWPASSWORD not exists.', async () => {
        const user = await factory.build('User')
        await factory.create('User', user)

        const response = await request(app)
            .put('/user/1')
            .send(user)
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Escolha uma nova senha.')
    })

    it('Should failed when field PASSWORD (Old password) is incorrect when try update a new password', async () => {
        let user = await factory.build('User')
        await factory.create('User', {
            ...user,
            password: bcrypt.hashSync(`${user.password}-fail`, 10)
        })

        user.newPassword = 'newPassword'
        
        const response = await request(app)
            .put('/user/1')
            .send(user)
        
        expect(response.status).toBe(406)
        expect(response.text).toBe('Senha errada!')
    })
})
describe('Update - USERS', () => {
    it('Should success update user.', async () => {
        let user = await factory.build('User')
        await factory.create('User', {
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        })

        user.newPassword = 'newPassword'
        
        const response = await request(app)
            .put('/user/1')
            .send(user)
        
        expect(response.status).toBe(200)
        expect(response.text).toBe('Usuário atualizado com sucesso.')
    })

})