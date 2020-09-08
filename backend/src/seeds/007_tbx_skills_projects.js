
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tbx_skills_projects').del()
      // Inserts seed entries
  await knex('tbx_skills_projects').insert([
    { id: 1, projects_id: 1, skills_id: 1 },
    { id: 2, projects_id: 1, skills_id: 2 },
    { id: 3, projects_id: 1, skills_id: 3 },
    { id: 4, projects_id: 1, skills_id: 4 },

    { id: 5,  projects_id: 2, skills_id: 1 },
    { id: 6,  projects_id: 2, skills_id: 2 },
    { id: 7,  projects_id: 2, skills_id: 3 },
  ]);
};