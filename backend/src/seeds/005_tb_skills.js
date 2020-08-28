const path = require('path')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tb_skills').del()
      // Inserts seed entries
  await knex('tb_skills').insert([
    { id: 1, 
      name: 'html5', 
      image: path.join(__dirname, '../images/icons', 'html5.svg')
    },
    { id: 2, 
      name: 'css3', 
      image: path.join(__dirname, '../images/icons', 'css3.svg')
    },
    { id: 3, 
      name: 'java', 
      image: path.join(__dirname, '../images/icons', 'java.svg')
    },
    { id: 4,
      name: 'javascript',
      image: path.join(__dirname, '../images/icons', 'javascript.svg')
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