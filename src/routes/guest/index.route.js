var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render('guest/vwIndex/index');
})

module.exports=router;