const express = require('express')

const { joiSchema } = require('../../models/current')
const {
  controllerWrapper,
  validation,
  authenticate
} = require('../../middlewares')
const { current: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAllByUser))

router.get('/all', controllerWrapper(ctrl.getAll))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add))

module.exports = router
