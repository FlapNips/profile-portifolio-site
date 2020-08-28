const dateNow = new Date()

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tb_educations').del()
      // Inserts seed entries
  await knex('tb_educations').insert([
    { users_id: 1,
      title: 'Curso completo - VUEJS',
      duration: 360,
      about: 'LOREM LOREM ABOUT EDUCATION',
      date_start: dateNow,
      date_finish: dateNow,
    }
  ]);
};