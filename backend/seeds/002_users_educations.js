const dateNow = new Date().toISOString()

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_educations').del()
      // Inserts seed entries
  await knex('users_educations').insert([
    { user_id: 1,
      education_title: 'Curso completo - VUEJS',
      education_duration: 360,
      education_date_start: dateNow,
      education_about: 'LOREM LOREM ABOUT EDUCATION',
    }
  ]);
};