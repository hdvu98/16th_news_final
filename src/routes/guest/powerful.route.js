var express = require('express');
var router = express.Router();
// post status: 0 public/ 1 chờ đăng/  2 chờ duyệt / 3 từ chối tuyệt
router.get('/editorMag', (req, res, next) => {
    res.render('guest/vwPowerful/editorMag');
})
router.get('/postMagWriter', (req, res, next) => {
    res.render('guest/vwPowerful/postMagWriter');
})
router.get('/submitPost', (req, res, next) => {
    res.render('guest/vwPowerful/submitPost');
})

router.post('/submitPost',(req,res,next)=>{
    try{
      
      var entity = {
        Title: req.body.title,
        Thumbnail: req.body.fuMain,
        Status_post: 2,
        FKCategory:req.body.category,
        FKIDWritter_post:req.user,
        DateComplete: 0,
        Content:req.body.content,
        Num_of_View:0,
        Num_of_Like:0,
        Num_of_Comment:0,
        Type_of_post:0
       }
       console.log(entity);
    //   userModel.add(entity).then(id => {
    //     res.redirect('/submitPost');
    //   })
      }catch(error){
        next(error);
      }
})

router.get('/adminCateMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminCateMag');
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