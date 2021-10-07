const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../helpers')
const { Contact } = require('../models')

const getAll = async (req, res) => {
  const data = await Contact.find({}, 'name favorite phone email') // можем вибирати які поля повернути
  sendSuccessRes(res, { data })
}

const getById = async (req, res) => {
  const { contactId } = req.params
  const data = await Contact.findById(contactId, 'name favorite phone email') // можем вибирати які поля повернути
  if (!data) {
    throw new NotFound(`id=${contactId} Not Found`) // NotFound повертає з ліби 404 помилку і наш вложений текст
  }
  sendSuccessRes(res, data) // обгортка над успішною відповідю
}

const add = async (req, res) => {
  const data = await Contact.create(req.body)
  sendSuccessRes(res, data, 201)
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true }) // що обновити , нащо обновити, повертає обновлений обєкт
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const removeById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not Found`)
  }
  sendSuccessRes(res, { message: 'contact deleted' })
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true }) // оновлення контакта тільки по полю favorite
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,

}
