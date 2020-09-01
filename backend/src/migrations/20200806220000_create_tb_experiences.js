
exports.up = function(knex) {
  return knex.schema.createTable('tb_experiences', table => {
    table.increments('id')
    table.integer('users_id').unsigned()
    table.string('title').notNullable().defaultTo('Titulo Vazio')
    table.string('subtitle').notNullable().defaultTo('Subtitulo Vazio')
    table.string('contract').notNullable().defaultTo('Contrato nao')
    table.text('about').notNullable()
    table.text('list').notNullable()
    table.text('image').notNullable()
    table.date('date_start').notNullable()
    table.date('date_finish').notNullable()
    
    table.foreign('users_id').references('tb_users.id')
      .onDelete('CASCADE')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_experiences')
};
