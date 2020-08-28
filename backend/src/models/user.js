

module.exports = app => {
    
    return class User {
        constructor(data) {
            if (data) {
                Object.entries(data).forEach(element => {
                    const [key, value] = element
                    this[key] = value
                })
            }
        }
        //
        static async add() {
            return await app.db('tb_users')
                .insert({
                    username: this.username,
                    password: this.password,
                    full_name: this.fullName,
                    profession: this.profession,
                    about: this.about,
                    avatar: this.avatar
                })
        }

        //Return true or false to exists User with ID or USERNAME
        async exists(usernameOrId) {
            if (!isNaN(usernameOrId)) {
                const value = await app.db('tb_users')
                    .where({ id: usernameOrId })
                    .first()
                return value === undefined ? undefined : true
            } else {
                const value = await app.db('tb_users')
                    .where({ username: usernameOrId })
                    .first()
                return value === undefined ? undefined : true
            }
        }

        //Return full information User with ID
        async find(id) {
            return await app.db('tb_users')
                .select([
                'tb_users.*',
                'tb_users.id as user_id',
                app.db.raw('GROUP_CONCAT(DISTINCT tb_experiences.id) as experiences_id'),

                app.db.raw('GROUP_CONCAT(DISTINCT tb_projects.id) as projects_id'),
                
                app.db.raw('GROUP_CONCAT(DISTINCT tbx_skills_users.skills_id) as skills_id')
                ])
                .leftJoin('tb_experiences', function() {
                this.on('tb_users.id', 'tb_experiences.users_id').onIn('tb_experiences.users_id', id)
                })
                .leftJoin('tb_projects', function() {
                this.on('tb_users.id', 'tb_projects.users_id').onIn('tb_projects.users_id', id)
                })
                .leftJoin('tbx_skills_users', function() {
                this.on('tb_users.id', '=', 'tbx_skills_users.users_id').onIn('tbx_skills_users.users_id', id)
                })
                .where('tb_users.id', id)
                .groupBy('tb_users.id')
                .first()
        }
    }
    return User
}