const express = require('express')

const { joiSchema } = require('../../models')
const {
  controllerWrapper,
  validation,
  authenticate
} = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

// api/users/signup
router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))
// router.post("/register")

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))
// router.post("/signin")

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
// router.get("/signuot")

module.exports = router
