
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('experiences_x_skills').del()
      // Inserts seed entries
  await knex('experiences_x_skills').insert([
    { id: 1, experience_id: 1, skill_id: 7 },
    { id: 2, experience_id: 1, skill_id: 1 },
    { id: 3, experience_id: 1, skill_id: 2 },
    { id: 4, experience_id: 1, skill_id: 3 },
    { id: 5, experience_id: 1, skill_id: 4 },
    { id: 6, experience_id: 1, skill_id: 5 },
    { id: 7, experience_id: 1, skill_id: 6 },

    { id: 8,  experience_id: 2, skill_id: 1 },
    { id: 9,  experience_id: 2, skill_id: 2 },
    { id: 10, experience_id: 2, skill_id: 3 },

    { id: 11, experience_id: 3, skill_id: 4 },
    { id: 12, experience_id: 3, skill_id: 5 },
    { id: 13, experience_id: 3, skill_id: 6 },
  ]);
};