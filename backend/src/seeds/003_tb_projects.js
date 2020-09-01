const dateNow = new Date().toISOString()

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tb_projects').del()
      // Inserts seed entries
  await knex('tb_projects').insert([
    { id: 1,
      users_id: 1,
      title: 'Titulo Projeto 1',
      subtitle: 'Subtitulo Projeto 1',
      about: 'LOREM LOREM ABOUT PROJECT',
      list: 'Item 1; Item2; Item3; Item4',
      link: 'www.google.com.br',
      date_start: dateNow,
      date_finish: dateNow,
    },
    { id: 2,
      users_id: 1,
      title: 'Titulo Projeto 2',
      subtitle: 'Subtitulo Projeto 2',
      about: 'LOREM LOREM ABOUT PROJECT',
      list: 'Item 1; Item2; Item3; Item4',
      link: 'www.google.com.br',
      date_start: dateNow,
      date_finish: dateNow,
    }
  ]);
};