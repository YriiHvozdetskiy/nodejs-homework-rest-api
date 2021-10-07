const { Current } = require('../../models')

const getAll = async (req, res) => {
  const result = await Current.find({}, 'id content owner')
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getAll
