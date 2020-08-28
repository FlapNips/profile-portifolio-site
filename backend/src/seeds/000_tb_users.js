const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_users').insert([
        { id: 1, 
          username: 'flapnips',
          password: bcrypt.hashSync('senhaflapnips', salt),
          full_name: 'Bruno Alfieri',
          profession: 'Desenvolvedor Full Stack Web',
          permission: 'admin',
          about: 'LOREM LOREM',
        },
        { id: 2, 
          username: 'manager',
          password: bcrypt.hashSync('senhamanager', salt),
          full_name: 'Bruno Alfieri',
          profession: 'Desenvolvedor Full Stack Web',
          permission: 'manager',
          about: 'LOREM LOREM',
        },
        { id: 3, 
          username: 'user',
          password: bcrypt.hashSync('senhauser', salt),
          full_name: 'Bruno Alfieri',
          profession: 'Desenvolvedor Full Stack Web',
          permission: 'user',
          about: 'LOREM LOREM',
        },
        { id: 4, 
          username: 'teste',
          password: bcrypt.hashSync('senhateste', salt),
          full_name: 'Bruno Alfieri',
          profession: 'Desenvolvedor Full Stack Web',
          permission: 'user',
          about: 'LOREM LOREM',
        },
      ]);
    });
};
