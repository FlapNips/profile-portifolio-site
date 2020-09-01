
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tb_contacts').del()
      // Inserts seed entries
  await knex('tb_contacts').insert([
    { users_id: 1,
      address: 'Brasil, SP, São Paulo - Zona Leste',
      phone: '11954682303',
      email: 'alfieri@outlook.com.br',
      github: 'https://github.com/FlapNips',
      linkedin: 'https://www.linkedin.com/in/bruno-alfieri-ba4009142/',
      facebook: 'https://www.facebook.com/br.alfieri',
    }
  ]);
};