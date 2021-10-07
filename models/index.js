const { Contact } = require('./contact')
// const { joiSchema } = require('./contact')
const { joiSchemaStatusContact } = require('./contact')
const { User } = require('./user')
const { Current } = require('./current')
const { joiSchema } = require('./user')

module.exports = {
  Contact,
  joiSchema,
  joiSchemaStatusContact,
  User,
  Current,
}
