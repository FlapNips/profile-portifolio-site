module.exports = app => {

  const {existsOrError} = app.api.validator

  const getAboutme = async (req, res) => {
    return app.db('aboutme')
                    .select()
                    .first()
                    .then( (data => res.status(201).json(data)))
                    .catch( error => res.status(400))
  }

  const updateAboutme = async (req, res) => {
    const data = { ...req.body }
    const links = await app.db('aboutme')
                    .select()
                    .first()
    console.log(links)
    try {
      if(!data.address  || data.address   == '') data.address  = links.address
      if(!data.phone    || data.phone     == '') data.phone    = links.phone
      if(!data.email    || data.email     == '') data.email    = links.email
      if(!data.github   || data.github    == '') data.github   = links.link_github
      if(!data.linkedin || data.linkedin  == '') data.linkedin = links.link_linkedin
      if(!data.facebook || data.facebook  == '') data.facebook = links.link_facebook
    } catch(error) {
      res.sendStatus(400)
    }

    app.db('aboutme')
      .update({
        address: data.address,
        phone: data.phone,
        email: data.email,
        link_github: data.github,
        link_linkedin: data.linkedin,
        link_facebook: data.facebook
      })
      .then( () => app.db('aboutme')
                    .select()
                    .first()
                    .then( (data => res.status(201).json(data)))
                    .catch( error => res.status(400)) )
      .catch( error => res.send(error) )
  }
  return { getAboutme, updateAboutme }
}