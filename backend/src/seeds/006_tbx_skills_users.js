
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tbx_skills_users').del()
      // Inserts seed entries
  await knex('tbx_skills_users').insert([
    { users_id: 1, skills_id: 1, percent: 100 },
    { users_id: 1, skills_id: 2, percent: 90 },
    { users_id: 1, skills_id: 3, percent: 80 },
    { users_id: 1, skills_id: 4, percent: 70 },

    { users_id: 2, skills_id: 1, percent: 100 },
    { users_id: 2, skills_id: 2, percent: 90 },
    { users_id: 2, skills_id: 3, percent: 0 },
    { users_id: 2, skills_id: 4, percent: 10 },
  ]);
};