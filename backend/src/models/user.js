const bcrypt = require('bcrypt')

module.exports = app => {
    class User {
        constructor(data) {
            this.content = data
        }

        async add() {
            return await app.db('tb_users')
                .insert({
                    username: this.content.username,
                    password: this.content.password,
                    full_name: this.content.fullName,
                    profession: this.content.profession,
                    about: this.content.about,
                    avatar: this.content.avatar
                })
        }

        async get(id) {
            return await app.db('tb_users')
                .select([
                    'tb_users.*',
                    'tb_users.id as user_id',
                    app.db.raw('GROUP_CONCAT(DISTINCT tb_experiences.id) as experiences_id'),

                    app.db.raw('GROUP_CONCAT(DISTINCT tb_projects.id) as projects_id'),
                
                    app.db.raw('GROUP_CONCAT(DISTINCT tbx_skills_users.skills_id) as skills_id')
                ])
                .leftJoin('tb_experiences', function () {
                    this.on('tb_users.id', 'tb_experiences.users_id').onIn('tb_experiences.users_id', id)
                })
                .leftJoin('tb_projects', function () {
                    this.on('tb_users.id', 'tb_projects.users_id').onIn('tb_projects.users_id', id)
                })
                .leftJoin('tbx_skills_users', function () {
                    this.on('tb_users.id', '=', 'tbx_skills_users.users_id').onIn('tbx_skills_users.users_id', id)
                })
                .where('tb_users.id', id)
                .groupBy('tb_users.id')
                .first()
        }
        async exists(param) {
            if (!isNaN(param)) {
                const value = await app.db('tb_users')
                    .where({ id: param })
                    .first()
                return value
            } else {
                const value = await app.db('tb_users')
                    .where({ username: param })
                    .first()
                return value
            }
        }

        compareEncrypt(valueNotEncrypt, valueEncrypt) {
            return bcrypt.compareSync(valueNotEncrypt, valueEncrypt)
        }
        encrypt(value) {
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(value, salt)
        }
        
    }
    return User
}