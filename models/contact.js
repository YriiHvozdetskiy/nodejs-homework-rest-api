const {
  Schema,
  model
} = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true, // name не може повторятися в колекції
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    unique: true, // email не може повторятися в колекції
  },
  phone: {
    type: String,
    required: [true, 'Set phone-number for contact'],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
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

contactSchema.virtual('info').get(function () {

})

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
  phone: Joi.number().positive().required(),
  favorite: Joi.boolean()
})

const joiSchemaStatusContact = Joi.object({ // перевіряє метод patch, який обновляє тільки поле favorite
  favorite: Joi.boolean().required(),
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
  phone: Joi.number().positive(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  joiSchemaStatusContact,
  Contact
}
