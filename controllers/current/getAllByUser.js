const { Current } = require('../../models')

const getAllByUser = async (req, res) => {
  const { id } = req.user
  const result = await Current.find({ owner: id })
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getAllByUser
