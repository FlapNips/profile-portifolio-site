
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects_x_skills').del()
      // Inserts seed entries
  await knex('projects_x_skills').insert([
    { id: 1, project_id: 1, skill_id: 7 },
    { id: 2, project_id: 1, skill_id: 1 },
    { id: 3, project_id: 1, skill_id: 2 },
    { id: 4, project_id: 1, skill_id: 3 },
    { id: 5, project_id: 1, skill_id: 4 },
    { id: 6, project_id: 1, skill_id: 5 },
    { id: 7, project_id: 1, skill_id: 6 },

    { id: 8,  project_id: 2, skill_id: 1 },
    { id: 9,  project_id: 2, skill_id: 2 },
    { id: 10, project_id: 2, skill_id: 3 },

    { id: 11, project_id: 3, skill_id: 4 },
    { id: 12, project_id: 3, skill_id: 5 },
    { id: 13, project_id: 3, skill_id: 6 },
  ]);
};