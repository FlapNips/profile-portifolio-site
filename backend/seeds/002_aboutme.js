
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('aboutme').del()
    .then(function () {
      // Inserts seed entries
      return knex('aboutme').insert([
        { address: 'Brasil, SP, São Paulo - Zona Leste',
          about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quasi officiis nostrum suscipit vitae quis nam, aperiam natus dolorem rem quas aspernatur voluptatibus corporis itaque numquam voluptas sequi qui. Debitis.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure dicta reiciendis id quam accusamus voluptatem ab, laboriosam quas tenetur tempora hic, dolores illo asperiores nostrum? Soluta adipisci fuga officia dolorem.',
          phone: '11954682303',
          email: 'alfieri@outlook.com.br',
          link_github: 'https://github.com/FlapNips',
          link_facebook: 'https://www.facebook.com/br.alfieri',
          link_linkedin: 'https://www.linkedin.com/in/bruno-alfieri-ba4009142/'
        },
      ]);
    });
};
