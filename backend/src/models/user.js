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
                
                    app.db.raw('GROUP_CONCAT(DISTINCT tb_skills.id) as skills_id'),
                    app.db.raw('GROUP_CONCAT(DISTINCT tb_educations.id) as educations_id')
                ])
                .leftJoin('tb_experiences', function () {
                    this.on('tb_users.id', 'tb_experiences.users_id').onIn('tb_experiences.users_id', id)
                })
                .leftJoin('tb_projects', function () {
                    this.on('tb_users.id', 'tb_projects.users_id').onIn('tb_projects.users_id', id)
                })
                .leftJoin('tb_skills', function () {
                    this.on('tb_users.id', '=', 'tb_skills.users_id').onIn('tb_skills.users_id', id)
                })
                .leftJoin('tb_educations', function () {
                    this.on('tb_users.id', '=', 'tb_educations.users_id').onIn('tb_educations.users_id', id)
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