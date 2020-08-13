
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_x_skills').del()
      // Inserts seed entries
  await knex('users_x_skills').insert([
    { user_id: 1, skill_id: 1, skill_percent: 100 },
    { user_id: 1, skill_id: 2, skill_percent: 90 },
    { user_id: 1, skill_id: 3, skill_percent: 80 },
    { user_id: 1, skill_id: 4, skill_percent: 70 },
    { user_id: 1, skill_id: 5, skill_percent: 60 },
    { user_id: 1, skill_id: 6, skill_percent: 50 },
    { user_id: 1, skill_id: 7, skill_percent: 40 },
    { user_id: 1, skill_id: 8, skill_percent: 30 },

    { user_id: 2, skill_id: 1, skill_percent: 100 },
    { user_id: 2, skill_id: 2, skill_percent: 90 },
    { user_id: 2, skill_id: 3, skill_percent: 0 },
    { user_id: 2, skill_id: 4, skill_percent: 10 },
    { user_id: 2, skill_id: 5, skill_percent: 20 },
  ]);
};