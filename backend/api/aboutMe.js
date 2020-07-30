module.exports = app => {
  const getAboutme = async (req, res) => {
    return app.db('aboutme')
                    .select()
                    .then( (data => res.status(201).json(data)))
                    .catch( error => res.status(400))
  }

  return { getAboutme }
}