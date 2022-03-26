const express = require('express');
const router = express.Router();


/** Check API Status **/
router.get('/status', function (req, res) {
  res.send({ type: 'GET' })
});


module.exports = router;