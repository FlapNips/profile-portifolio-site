const dateNow = new Date().toISOString()

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tb_experiences').del()
      // Inserts seed entries
  await knex('tb_experiences').insert([
    { id: 1,
      users_id: 1,
      title: 'Titulo Experiencia 1',
      subtitle: 'Subtitle Experiencia 1',
      contract: 'Contrato (PJ, Autonomo...)',
      about: 'LOREM LOREM ABOUT experience',
      list: 'Item 1; Item2; Item3; Item4',
      image: 'Link da imagem',
      date_start: dateNow,
      date_finish: dateNow,
    },
    { id: 2,
      users_id: 1,
      title: 'Titulo Experiencia 2',
      subtitle: 'Subtitle Experiencia 2',
      contract: 'Contrato (PJ, Autonomo...)',
      about: 'LOREM LOREM ABOUT experience',
      list: 'Item 1; Item2; Item3; Item4',
      image: 'Link da imagem',
      date_start: dateNow,
      date_finish: dateNow,
    }
  ]);
};