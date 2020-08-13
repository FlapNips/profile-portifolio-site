const path = require('path')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('skills').del()
      // Inserts seed entries
  await knex('skills').insert([
    { skill_id: 1, skill_name: 'html5', skill_path: path.join(__dirname, '../images/icons', 'html5.svg')},
    { skill_id: 2, skill_name: 'css3', skill_path: path.join(__dirname, '../images/icons', 'css3.svg')},
    { skill_id: 3, skill_name: 'java', skill_path: path.join(__dirname, '../images/icons', 'java.svg')},
    { skill_id: 4, skill_name: 'javascript', skill_path: path.join(__dirname, '../images/icons', 'javascript.svg')},
    { skill_id: 5, skill_name: 'vuejs', skill_path: path.join(__dirname, '../images/icons', 'vuejs.svg')},
    { skill_id: 6, skill_name: 'mysql', skill_path: path.join(__dirname, '../images/icons', 'mysql.svg')},
    { skill_id: 7, skill_name: 'psql', skill_path: path.join(__dirname, '../images/icons', 'psql.svg')},
    { skill_id: 8, skill_name: 'android', skill_path: path.join(__dirname, '../images/icons', '')},
    { skill_id: 9, skill_name: 'flutter', skill_path: path.join(__dirname, '../images/icons', '')},
    { skill_id: 10, skill_name: 'bootstrap 4', skill_path: path.join(__dirname, '../images/icons', '')},
    { skill_id: 11, skill_name: 'SASS', skill_path: path.join(__dirname, '../images/icons', '')},
    { skill_id: 12, skill_name: 'Docker', skill_path: path.join(__dirname, '../images/icons', '')},
    { skill_id: 13, skill_name: 'Laravel', skill_path: path.join(__dirname, '../images/icons', '')},
    { skill_id: 14, skill_name: 'PHP', skill_path: path.join(__dirname, '../images/icons', '')},
  ]);
};