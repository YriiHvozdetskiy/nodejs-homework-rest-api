const {
  Schema,
  model
} = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, {
  versionKey: false, // не вказуєм версію v
  timestamps: true, // замість версії буде 2 дод поля: create, update
  toJSON: {        // повертаєм в jsoni id без _
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id
      return ret
    }
  },
  toObject: {
    virtuals: true
  }
})
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.createToken = function () {
  const payload = {
    id: this.id
  }
  return jwt.sign(payload, SECRET_KEY)
}

const joiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
