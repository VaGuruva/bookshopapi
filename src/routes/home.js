const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json('Book Ordering Rest Api Up and Ruinning.')
})

module.exports = router
