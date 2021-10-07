const validationStatusContact = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'Error',
        code: 400,
        message: 'missing field favorite',
      })
      return
    }
    next()
  }
}
module.exports = validationStatusContact
