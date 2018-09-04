const controller = require('./controller.js')
const express = require('express')
const router = express.Router()

router
  .route('/list')
  .get(controller.get)
  .post(controller.post)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;