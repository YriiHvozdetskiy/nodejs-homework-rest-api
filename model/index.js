const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json') // абсолютний шлях до файлу contacts.json

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts() // отримуєм масив всіх контактів
  const contact = contactsList.find(contact => contact.id.toString() === contactId.toString()) // приводим id з запроса і з бази даних в один тип
  if (!contact) return null // повертаєм null якщо такого id немає

  return contact
}

const addContact = async (data) => {
  const contactsList = await listContacts()
  const newContact = {
    ...data,
    id: nanoid()
  }
  contactsList.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsList)) // перезаписуєм файл contacts.json новими даними

  return newContact
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const filterContactsList = contactsList.filter(contact => contact.id.toString() !== contactId)// приводимо id з contacts.json в строку
  if (contactsList.length === filterContactsList.length) return null

  await updateContact(filterContactsList)

  return 'Success remove'
}

const updateContactById = async (id, data) => {
  const products = await listContacts()
  const idx = products.findIndex(item => item.id.toString() === id.toString())
  if (idx === -1) return null

  const newContact = { ...products[idx], ...data }
  products[idx] = newContact
  await updateContact(products)
  return newContact
}

// допоміжна ф-ція для оновлення contacts.json
async function updateContact(newContacts) {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
