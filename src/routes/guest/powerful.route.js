var express = require('express');
var router = express.Router();

router.get('/editorMag', (req, res, next) => {
    res.render('guest/vwPowerful/editorMag');
})

module.exports = router;