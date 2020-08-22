
exports.up = function(knex) {
  return knex.schema.createTable('users_experiences', table => {
    table.increments('experience_id')
    table.integer('user_id').unsigned()
    table.string('experience_title').notNullable()
    table.string('experience_office').notNullable().defaultTo('vazio')
    table.string('experience_contract').notNullable().defaultTo('vazio')
    table.date('experience_date_start').notNullable()
    table.date('experience_date_finish').notNullable()
    table.text('experience_about').notNullable()
    table.text('experience_list_about').notNullable()
    table.text('experience_image').notNullable()
    
    table.foreign('user_id').references('user_id').inTable('users')
        .onDelete('CASCADE')
  }).then( () => {
    knex.seed.run({ specific: '007_users_experiences.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_experiences')
};
