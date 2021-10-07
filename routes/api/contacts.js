const express = require('express')
const router = express.Router()
const {
  joiSchema,
  joiSchemaStatusContact
} = require('../../models')
const {
  validation,
  controllerWrapper,
  validationStatusContact,
} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', validationStatusContact(joiSchemaStatusContact), controllerWrapper(ctrl.updateStatusContact)) // оновлення контакта тільки по полю favorite

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

module.exports = router
