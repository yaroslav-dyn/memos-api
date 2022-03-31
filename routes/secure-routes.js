const express = require('express');
const router = express.Router();


/** Check API Status **/
router.get('/status', function (req, res) {
  //res.send({ type: 'GET' })
  res.send({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
});


module.exports = router;