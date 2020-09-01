
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tbx_skills_experiences').del()
      // Inserts seed entries
  await knex('tbx_skills_experiences').insert([
    { id: 1, experiences_id: 1, skills_id: 1 },
    { id: 2, experiences_id: 1, skills_id: 2 },
    { id: 3, experiences_id: 1, skills_id: 3 },
    { id: 4, experiences_id: 1, skills_id: 4 },

    { id: 5,  experiences_id: 2, skills_id: 1 },
    { id: 6,  experiences_id: 2, skills_id: 2 },
    { id: 7,  experiences_id: 2, skills_id: 3 },
  ]);
};