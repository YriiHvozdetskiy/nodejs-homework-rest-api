const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../helpers')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require('../model')

const getAll = async (req, res) => {
  const data = await listContacts()
  sendSuccessRes(res, data)
}

const getById = async (req, res) => {
  const { contactId } = req.params
  const data = await getContactById(contactId)
  if (!data) {
    throw new NotFound(`id=${contactId} Not Found`) // NotFound повертає з ліби 404 помилку і наш вложений текст
  }
  sendSuccessRes(res, data) // обгортка над успішною відповідю
}

const add = async (req, res) => {
  const data = await addContact(req.body)
  sendSuccessRes(res, data, 201) // обгортка над успішною відповідю
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await updateContactById(contactId, req.body)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`) // NotFound повертає з ліби 404 помилку і наш вложений текст
  }
  sendSuccessRes(res, { result }) // обгортка над успішною відповідю
}

const removeById = async (req, res) => {
  const { contactId } = req.params
  const result = await removeContact(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not Found`) // NotFound повертає з ліби 404 помилку і наш вложений текст
  }
  sendSuccessRes(res, { message: 'contact deleted' }) // обгортка над успішною відповідю
}

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,

}
