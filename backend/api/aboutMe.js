module.exports = app => {

  const getAboutme = async (req, res) => {
    return app.db('aboutme')
                    .select()
                    .first()
                    .then( (data => res.status(201).json(data)))
                    .catch( error => res.status(400))
  }

  const updateAboutme = async (req, res) => {
    const data = { ...req.body }

    return app.db('aboutme')
      .update({
        about: data.about,
        address: data.address,
        phone: data.phone,
        email: data.email,
        link_github: data.github,
        link_linkedin: data.linkedin,
        link_facebook: data.facebook
      })
      .then( () => res.sendStatus(200) )
      .catch( error => res.send(error) )
  }
  return { getAboutme, updateAboutme }
}