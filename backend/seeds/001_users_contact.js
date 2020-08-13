
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_contact').del()
      // Inserts seed entries
  await knex('users_contact').insert([
    { user_id: 1,
      address: 'Brasil, SP, São Paulo - Zona Leste',
      phone: '11954682303',
      email: 'alfieri@outlook.com.br',
      github: 'https://github.com/FlapNips',
      facebook: 'https://www.facebook.com/br.alfieri',
      linkedin: 'https://www.linkedin.com/in/bruno-alfieri-ba4009142/'
    }
  ]);
};