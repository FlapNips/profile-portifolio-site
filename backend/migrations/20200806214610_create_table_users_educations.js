
exports.up = function(knex) {
  return knex.schema.createTable('users_educations', table => {
    table.integer('user_id').unsigned()
    table.string('education_title').notNullable()
    table.integer('education_duration').notNullable().defaultTo(0)
    table.date('education_date_start').notNullable()
    table.date('education_date_finish').notNullable()
    table.text('education_about').notNullable()
    
    table.foreign('user_id').references('user_id').inTable('users')
        .onDelete('CASCADE')
  }).then( () => {
    knex.seed.run({ specific: '002_users_educations.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_educations')
};
