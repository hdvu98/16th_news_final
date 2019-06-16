var express = require('express');
var router = express.Router();
var categoryModel = require('../../models/Category.model');

router.get('/editorMag', (req, res, next) => {
    res.render('guest/vwPowerful/editorMag');
})
router.get('/postMagWriter', (req, res, next) => {
    res.render('guest/vwPowerful/postMagWriter');
})
router.get('/submitPost', (req, res, next) => {
    res.render('guest/vwPowerful/submitPost');
})
router.get('/adminCateMag', (req, res, next) => {
    var p = categoryModel.all();
    p.then(rows => {
      // console.log(rows);
      res.render('guest/vwPowerful/adminCateMag', {
        categories: rows
      });
    }).catch(err => {
      console.log(err);
    });
    
})
router.get('/editCategory/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('editCategory', { error: true });
      return;
    }
  
    categoryModel.single(id).then(rows => {
      if (rows.length > 0) {
        res.render('editCategory', {
          error: false,
          category: rows[0]
        });
      } else {
          console.log('loi');
        res.render('editCategory', { error: true });
      }
    }).catch(err => {
      console.log(err);
    });
  })
  
router.get('/addCategory', (req, res, next) => {
    res.render('guest/vwPowerful/addCategory');
})
router.post('/addCategory', (req, res, next) => {
    var entity={
        Name_parentscate:req.body.CatName,
        Status_parentscate:0
    }
    categoryModel.add(entity)
    .then(id => {
      console.log(id);
      res.render('guest/vwPowerful/addCategory');
    }).catch(err => {
      console.log(err);
    }) 
})
router.get('/adminEditorMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminEditorMag');
})
router.get('/adminMemberMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminMemberMag');
})
router.get('/adminPostMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminPostMag');
})
router.get('/adminWriterMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminWriterMag');
})
router.get('/adminTagMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminTagMag');
})
module.exports = router;