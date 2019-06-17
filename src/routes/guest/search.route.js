var express=require('express');
var router=express.Router();
var postModel=require('../../models/Post.model');
var tagModel=require('../../models/Tag.model');

router.get('/',(req,res)=>{    
    var key=req.query.search;
    var filter=req.query.filter;
    var posts=null;
    switch(filter){
        case '0':
        {
            posts= postModel.searchDefault(key);
            break;
        }
        case '1':
        {
            posts= postModel.searchTitle(key);
            break;
        } 
        case '2':
        {
            posts= postModel.searchContent(key);
            break;
        }
    }
   console.log(posts);
    Promise.all([posts]).then( ([rows1]) => {
        res.render('guest/vwSearch/Search.hbs',{posts:rows1});
    }).catch(err=>{
        console.log(err);
        res.eng('error occured');
    });
})

// router.post('/',(req,res)=>{

//     var limit = 10;
//     var key=req.body.search;
//     console.log("key=");
//     console.log(key);

//     console.log("filter=");
//     console.log(filter);
  
//     var page = req.query.page || 1;
//     if (page < 1) page = 1;
//     var offset = (page - 1) * limit;

//     var id=req.params.id;
//     var posts= postModel.searchDefault(key, limit, offset);
//     var tag=tagModel.singleByID(id);
//     var count_rows = postModel.countPostsByTag(id)
//     Promise.all([posts,tag,count_rows]).then( ([rows1, rows2,rows3]) => {
//         var pages = [];
//         var total = rows3[0].total;
//         var nPages = Math.floor(total / limit);
//         if (total % limit > 0) nPages++;
//         first=1;
//         last=nPages;
//         for (i = 1; i <= nPages; i++) {
            
//           var active = false;
//           if (+page === i) active = true;
    
//           var obj = {
//             value: i,
//             active
//           }
//           pages.push(obj);
//         }
    
//         res.redirect('guest/vwSearch/Search.hbs',{posts:rows1,tag:rows2,pages,first,last});
//         //res.render('guest/vwSearch/Search.hbs',{posts:rows1,tag:rows2,pages,first,last});
//     }).catch(err=>{
//         console.log(err);
//         res.eng('error occured');
//     });
    
// })

module.exports=router;