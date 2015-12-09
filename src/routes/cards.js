var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:card_id', function(req, res, next) {
  var card_id = req.params.card_id ;

  res.render('index', { title: 'Express', body:' helloo' });
});

module.exports = router;
