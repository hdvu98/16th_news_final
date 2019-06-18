var multer = require('multer');
const bodyParser= require('body-parser');
var hbs_sections = require('express-handlebars-sections');


var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, `./public/imgs/`);
  },
})

var upload = multer({storage: storage});

module.exports = function (app) {
  app.post('/upload', (req, res, next) => {
    multer({ storage }).single('fuMain')(req, res, err => {
      if (err) { 
        return res.json({
          error: err.message
        })
      }
      res.json({
        file:req.file
      });
    })
  })
}

