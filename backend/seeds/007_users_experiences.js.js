const dateNow = new Date().toISOString()

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_experiences').del()
      // Inserts seed entries
  await knex('users_experiences').insert([
    { experience_id: 1,
      user_id: 1,
      experience_title: 'EXPERINCIA 1',
      experience_date_start: dateNow,
      experience_date_finish: dateNow,
      experience_about: 'LOREM LOREM ABOUT experience',
    },
    { experience_id: 2,
      user_id: 1,
      experience_title: 'EXPERINCIA 2',
      experience_date_start: dateNow,
      experience_date_finish: dateNow,
      experience_about: 'LOREM LOREM ABOUT experience',
    },
    { experience_id: 3,
      user_id: 2,
      experience_title: 'EXPERINCIA 3',
      experience_date_start: dateNow,
      experience_date_finish: dateNow,
      experience_about: 'LOREM LOREM ABOUT experience',
    },
    { experience_id: 4,
      user_id: 2,
      experience_title: 'EXPERINCIA 4',
      experience_date_start: dateNow,
      experience_date_finish: dateNow,
      experience_about: 'LOREM LOREM ABOUT experience',
    },
    { experience_id: 5,
      user_id: 3,
      experience_title: 'EXPERINCIA 5',
      experience_date_start: dateNow,
      experience_date_finish: dateNow,
      experience_about: 'LOREM LOREM ABOUT experience',
    },
    { experience_id: 6,
      user_id: 3,
      experience_title: 'EXPERINCIA 6',
      experience_date_start: dateNow,
      experience_date_finish: dateNow,
      experience_about: 'LOREM LOREM ABOUT experience',
    },
  ]);
};