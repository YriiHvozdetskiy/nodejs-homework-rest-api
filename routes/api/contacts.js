const express = require('express')
const router = express.Router()
const { contactSchema } = require('../../shemas')
const {
  validation,
  controllerWrapper
} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validation(contactSchema), controllerWrapper(ctrl.updateById))

module.exports = router
