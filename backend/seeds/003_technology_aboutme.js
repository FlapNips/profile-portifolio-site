
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('technology_aboutme').del()
    .then(function () {
      // Inserts seed entries
      return knex('technology_aboutme').insert([
        {icon_id: 1, percent: 10},
        {icon_id: 2, percent: 20},
        {icon_id: 3, percent: 30},
        {icon_id: 4, percent: 40},
        {icon_id: 5, percent: 50},
        {icon_id: 6, percent: 60},
        {icon_id: 7, percent: 70},
        {icon_id: 8, percent: 80},
        {icon_id: 9, percent: 90},
        {icon_id: 10, percent: 100},
      ]);
    });
};
