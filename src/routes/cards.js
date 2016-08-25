var express = require('express');
var router = express.Router();

var TTPLeecher = require('../lib/TTPLeecher');

/* GET home page. */
router.get('/:card_id', function(req, res, next) {
  var card_id = req.params.card_id ;

  TTPLeecher.query(card_id, function(err, content) {
      if (err) return res.json(err);

      return res.json(content);
  });


});

module.exports = router;
