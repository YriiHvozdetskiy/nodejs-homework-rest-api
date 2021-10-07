const { Current } = require('../../models')

const add = async (req, res) => {
  const newOrder = {
    ...req.body,
    owner: req.user.id,
  }
  const result = await Current.create(newOrder)
  res.json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

module.exports = add
//
// Content-Type: application/json
// ResponseBody: {
//   "email": "example@example.com",
//     "subscription": "starter"
