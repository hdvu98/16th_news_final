var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('guest/vwTopic/Topic');
})

module.exports=router;