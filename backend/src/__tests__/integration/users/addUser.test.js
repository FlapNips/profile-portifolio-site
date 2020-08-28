const request = require('supertest')

const app = require('../../../app.js')

const factory = require('../../factories.js')

describe('Add User', () => {
    
    afterAll( async done => {
        await app.db.destroy();
        done();
    });

    it('Cria um perfil com falha no username', async () => {
        const user = factory.create('User')
        
        const response = await request(app)
            .post('/user')
            .send(user)
                
        expect(response.status).toBe(406)
        expect(response.text).toBe('Insira o usuário.')
    })
})

