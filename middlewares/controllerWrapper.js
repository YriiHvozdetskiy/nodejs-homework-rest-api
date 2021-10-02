// обгортаєм наші контролери (controllers/contact) щоб не писати в кожному зних try/catch
const controllerWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next)
    } catch (e) {
      next(e) // кидає помилку в міделвару в app
    }
  }
}

module.exports = controllerWrapper
