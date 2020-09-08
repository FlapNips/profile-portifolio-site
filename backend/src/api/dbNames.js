module.exports = app => {

  function Users() {
    return eval('app.db("tb_users")')
  }

  function Contacts() {
    return eval('app.db("tb_contacts")')
  }

  function Educations() {
    return eval('app.db("tb_educations")')
  }
  
  function Projects() {
    return eval('app.db("tb_projects")')
  }

  function Experiences() {
    return eval('app.db("tb_experiences")')
  }

  function Skills() {
    return eval('app.db("tb_skills")')
  }

  function SXE() {
    return eval('app.db("tbx_skills_experiences")')
  }

  function SXP() {
    return eval('app.db("tbx_skills_projects")')
  }
  
  return {
    Users,
    Contacts,
    Educations,
    Projects,
    Experiences,
    Skills,
    SXE,
    SXP
  }
}