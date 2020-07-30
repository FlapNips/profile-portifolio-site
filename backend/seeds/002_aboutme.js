
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('aboutme').del()
    .then(function () {
      // Inserts seed entries
      return knex('aboutme').insert([
        { address: 'Brasil, SP, São Paulo - Zona Leste',
          phone: '(11) 95468-2303',
          email: 'alfieri@outlook.com.br',
          link_github: 'https://github.com/FlapNips',
          link_facebook: 'https://www.facebook.com/br.alfieri',
          link_linkedin: 'https://www.linkedin.com/in/bruno-alfieri-ba4009142/'
        },
      ]);
    });
};
