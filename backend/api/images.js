const path = require('path')
module.exports = app => {

  const addIcon = (req, res) => {
    console.log(req.file)
    return res.send('foi')
  }
  const getIcon = (req, res) => {
    res.sendFile(path.join(__dirname, '../images/icons', `${req.params.name}.svg`))
  }
  return { addIcon, getIcon }
}