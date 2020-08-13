module.exports = app => {
  const dbSkills = () => {
    return eval('app.db("skills")')
  }

  const dbUsers = () => {
    return eval('app.db("users")')
  }

  const dbUXS = () => {
    return eval('app.db("users_x_skills")')
  }


  return {
    dbSkills,
    dbUsers,
    dbUXS
  }

}