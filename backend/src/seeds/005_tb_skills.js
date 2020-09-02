const path = require('path')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tb_skills').del()
      // Inserts seed entries
  await knex('tb_skills').insert([
    { id: 1, 
      users_id: 1, 
      title: 'html5', 
      fileName: '1_html5.svg', 
      percent: 50
    },
    { id: 2, 
      users_id: 1, 
      title: 'css3',
      fileName: '1_css3.svg', 
      percent: 54
    },
    { id: 3, 
      users_id: 1, 
      title: 'java',
      fileName: '1_java.svg', 
      percent: 24
    },
    { id: 4,
      users_id: 1, 
      title: 'javascript',
      fileName: '1_javascript.svg',
      percent: 100
    },
    // { id: 5,
    //   name: 'vuejs',
    //   image: path.join(__dirname, '../images/icons', 'vuejs.svg')
    // },
    // { id: 6,
    //   name: 'mysql',
    //   image: path.join(__dirname, '../images/icons', 'mysql.svg')
    // },
    // { id: 7,
    //   name: 'psql',
    //   image: path.join(__dirname, '../images/icons', 'psql.svg')
    // },
    // { id: 8,
    //   name: 'android',
    //   image: path.join(__dirname, '../images/icons', '')
    // },
    // { id: 9,
    //   name: 'flutter',
    //   image: path.join(__dirname, '../images/icons', '')
    // },
    // { id: 10,
    //   name: 'bootstrap 4',
    //   image: path.join(__dirname, '../images/icons', '')
    // },
    // { id: 11,
    //   name: 'SASS',
    //   image: path.join(__dirname, '../images/icons', '')
    // },
    // { id: 12,
    //   name: 'Docker',
    //   image: path.join(__dirname, '../images/icons', '')
    // },
    // { id: 13,
    //   name: 'Laravel',
    //   image: path.join(__dirname, '../images/icons', '')
    // },
    // { id: 14,
    //   name: 'PHP',
    //   image: path.join(__dirname, '../images/icons', '')
    // },
  ]);
};