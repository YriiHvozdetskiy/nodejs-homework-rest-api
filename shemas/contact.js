const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(3).required(),
  phone: Joi.number().min(6).required(),
})

module.exports = contactSchema
