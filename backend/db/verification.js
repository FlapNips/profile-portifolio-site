const fs = require('fs')
const path = require('path')

module.exports = async app => {

  async function verificationImages() {
    const skills = await app.db('skills')
    skills.forEach( async element => {
      const elementObj = path.parse(element.skill_path)
      const existsImage = fs.existsSync(element.skill_path)
      if( elementObj.ext === '' || !existsImage) {
        console.log(elementObj)
        await app.db('skills')
          .del()
          .where({ skill_id: element.skill_id })
      }
    
    })
  }

  verificationImages()
}