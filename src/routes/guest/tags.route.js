var express=require('express');
var router=express.Router();
var postModel=require('../../models/Post.model');
var tagModel=require('../../models/Tag.model');

router.get('/:id',(req,res)=>{

    var limit = 10;
  
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;

    var id=req.params.id;
    var posts= postModel.allPostByTag(id, limit, offset);
    var tag=tagModel.singleByID(id);
    var count_rows = postModel.countPostsByTag(id)
    Promise.all([posts,tag,count_rows]).then( ([rows1, rows2,rows3]) => {
        var pages = [];
        var total = rows3[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        first=1;
        last=nPages;
        for (i = 1; i <= nPages; i++) {
            
          var active = false;
          if (+page === i) active = true;
    
          var obj = {
            value: i,
            active
          }
          pages.push(obj);
        }
    
        res.render('guest/vwTags/Tags.hbs',{posts:rows1,tag:rows2,pages,first,last});
    }).catch(err=>{
        console.log(err);
        res.eng('error occured');
    });
    
})

module.exports=router;