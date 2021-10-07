const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const login = async (req, res) => {
  const {
    email,
    password
  } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  const {
    id,
    subscription
  } = user
  const token = user.createToken()
  await User.findByIdAndUpdate(id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      }
    }
  })
}

module.exports = login
