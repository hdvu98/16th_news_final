var express = require('express');
var multer=require('multer');
var router = express.Router();

var categoryModel = require('../../models/Category.model');
var topicModel = require('../../models/Topic.model');
var postModel=require('../../models/Post.model');
//require('../../middlewares/upload')(router);

// post status: 0 public/ 1 chờ đăng/  2 chờ duyệt / 3 từ chối tuyệt /4 xóa
router.get('/editorMag', (req, res, next) => {
    res.render('guest/vwPowerful/editorMag');
})
router.get('/postMagWriter', (req, res, next) => {
  if(req.isAuthenticated())
  {
    if(req.user.Type_account==1)
    {
    var limit = 10; 
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
      var posts=postModel.allByWriter(req.user.IDAccount,limit,offset);
      var count=postModel.countByWriter(req.user.IDAccount);
      Promise.all([posts,count]).then(([posts,count])=>{

        //Phân trang

        var pages = [];
                var total = count[0].total;
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

        //phân trang

        var post_status=[];
        nPosts=posts.length;
        for (i = 0; i <nPosts ; i++) {
          Accepted = false;
          Denied=false;
          Published=false;
          Pendding=false;
          post=posts[i];
          if(posts[i].Status_post==0)
          {
            Published=true;
          }    
          else if(posts[i].Status_post==1)
          {
            Accepted=true;
          }
          else if(posts[i].Status_post==2)
          {
            Pendding=true;
          }
          else{
            Denied=true;
          }
          
          var obj = {
          post,
          Accepted,
          Denied,
          Published,
          Pendding
          }
          post_status.push(obj);
        }
        res.render('guest/vwPowerful/postMagWriter',{post_status,pages});
      }).catch(err=>{
        console.log(err);
        res.eng('error occured');
    });
     
    }
   else{
     res.redirect('/');
   }

  }
  else{
    res.redirect('/account/login');
  }
 
})

router.get('/submitPost', (req, res, next) => {
  if(req.isAuthenticated())
  {
    if(req.user.Type_account==1){
      var category=categoryModel.cateByUser(req.user.IDAccount);
      var topic=topicModel.all();
      Promise.all([category,topic]).then(([category,topic])=>{
        var topics=[];
        console.log(category);
        console.log(topic);
        if(category.length>0)
          {
            for(i=0;i<topic.length;i++)
            {
              
                if(topic[i].FKIDCate_Parents==category[0].IDCate_Parents)
                {
                  topics.push(topic[i]);
                }            
            }
          }
        res.render('guest/vwPowerful/submitPost',{category,topics});
      })
     
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.redirect('/account/login');
  }
    
})

router.post('/submitPost',(req,res,next)=>{

    try{
      console.log(req.file);
      var entity = {
        Title: req.body.title,
        Thumbnail: "/imgs/1.jpg",
        Status_post: 2,
        FKCategory:req.body.category,
        FKIDWritter_post:req.user.IDAccount,
        Content:req.body.content,
        Num_of_View:0,
        Num_of_Like:0,
        Num_of_Comment:0,
        Type_of_post:req.body.type
       }
      postModel.add(entity).then(id => {
        res.redirect('/powerful/postMagWriter');
      })
      }catch(error){
        next(error);
      }
  
})

router.get('/postMagWriter/raw/:id',(req, res, next) => {
  var id=req.params.id;
  var post=postModel.singleRaw(id);
  Promise.all([post]).then(([post])=>{
        res.render('guest/vwPowerful/vwWriter/raw',{post:post});
  }).catch(err => {
    console.log(err);
  });
  
})
router.get('/postMagWriter/edit/:id',(req, res, next) => {
  var id=req.params.id;
  var post=postModel.singleRaw(id);
  var category=categoryModel.cateByUser(req.user.IDAccount);
  var topic=topicModel.all();
  Promise.all([post,category,topic]).then(([post,category,topic])=>{
    var topics=[];
    console.log(category);
    console.log(topic);
    if(category.length>0)
      {
        for(i=0;i<topic.length;i++)
        {
          
            if(topic[i].FKIDCate_Parents==category[0].IDCate_Parents)
            {
              topics.push(topic[i]);
            }            
        }
      }
    res.render('guest/vwPowerful/vwWriter/editPost',{post:post,category,topics});
  }).catch(err => {
    console.log(err);
  });
  
});
router.post('/postMagWriter/edit/:id',(req, res, next) => {
  try{
    var id=req.params.id;
    var url="/powerful/postMagWriter/raw/"+id;
    var entity = {
      IDPost:id,
      Title: req.body.title,
      Thumbnail: "/imgs/1.jpg",
      Status_post: 2,
      FKCategory:req.body.category,
      FKIDWritter_post:req.user.IDAccount,
      Content:req.body.content,
      Num_of_View:0,
      Num_of_Like:0,
      Num_of_Comment:0,
      Type_of_post:req.body.type
     }
    postModel.update(entity).then(rows => {
      res.redirect(url);
    })
    }catch(error){
      next(error);
    }
  
})

router.post('/postMagWriter/delete/:id',(req, res, next) => {
  try{
    var id=req.params.id;
    var entity = {
      IDPost:id,
      Status_post: 4,
     }
    postModel.update(entity).then(rows => {
      res.redirect('/powerful/postMagWriter');
    })
    }catch(error){
      next(error);
    }
  
})

//route admin category management page

router.get('/adminCateMag', (req, res, next) => {
  if(req.isAuthenticated() && req.isAdmin){
    
    var p = categoryModel.all();
    p.then(rows => {
      // console.log(rows);
      res.render('guest/vwPowerful/adminCateMag', {
        categories: rows
      });
    }).catch(err => {
      console.log(err);
    });
    
  }
  else{
    res.redirect('/account/login');
  }
    
})

//add topics

router.get('/adminTopicsMag/:id', (req, res) => {
  if(req.isAuthenticated() && req.isAdmin){
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('guest/vwPowerful/adminTopicsMag', { error: true });
      return;
    }
    categoryModel.single(id).then(rows=>{
      res.locals.nameCategory=rows[0];
      
  });
   
    topicModel.topicFromParentsCateByID(id).then(rows => {
        if (rows.length > 0) {
            res.render('guest/vwPowerful/adminTopicsMag', {
                error: false,
                topics: rows
                
            });
            
        } else {
           
          res.render('guest/vwPowerful/adminTopicsMag', { error: true });
        }
      }).catch(err => {
        console.log(err);
      });    

  }
  else{
    res.redirect('/account/login');
  }
    
  })

  

router.get('/addTopic/:id', (req, res,next) => {
  if(req.isAuthenticated() && req.isAdmin){
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('guest/vwPowerful/addTopic', { error: true });
      return;
    }
    categoryModel.single(id).then(rows => {
      if (rows.length > 0) {
        
        res.render('guest/vwPowerful/addTopic', {
          error: false,
          category: rows[0]
        });
      } else {
         
        res.render('guest/vwPowerful/addTopic', { error: true });
      }
    }).catch(err => {
      console.log(err);
    });
      

  }
  else{
    res.redirect('/account/login');
  }
  
})
router.post('/addTopic/:id', (req, res, next) => {
  try{
    var id=req.body.IDCate_Parents;

    var entity={
      Name_childcate:req.body.topicName,
      Status_childcate:0,
      FKIDCate_Parents:id
    }
    topicModel.add(entity)
    .then(id => {
      console.log(id);
      res.redirect('/powerful/adminCateMag');
    }).catch(err => {
      console.log(err);
    }) 
  }catch(error){
    next(error);
  }
})
//edit topics
router.get('/editTopics/:id', (req, res) => {
  if(req.isAuthenticated() && req.isAdmin){
    var id = req.params.id;
  
    if (isNaN(id)) {
      res.render('guest/vwPowerful/editTopics', { error: true });
      return;
    }
    
    topicModel.parent(id).then(rows=>{
      res.locals.nameCate=rows[0];
      
    });
    topicModel.single(id).then(rows => {
      if (rows.length > 0) {
        
        res.render('guest/vwPowerful/editTopics', {
          error: false,
          topics: rows[0]
        });
      } else {
         
        res.render('guest/vwPowerful/editTopics', { error: true });
      }
    }).catch(err => {
      console.log(err);
    }); 

  }
  else{
    res.redirect('/account/login');
  }
  
})

router.post('/updateTopic', (req, res) => {
  try{
    var idCat=req.body.IDCate_Parents;
    var url="/powerful/adminTopicsMag/"+idCat;
    var entity={
      IDCate_Child:req.body.IDCate_Child,
      Name_childcate:req.body.Name_childcate
    }
    topicModel.update(entity)
      .then(n => {
       
        res.redirect(url);
      }).catch(err => {
        console.log(err);
      })    
  
  }catch(error){
    next(error);
  }
})
router.post('/deleteTopic', (req, res) => {

  try{
    var idCat=req.body.IDCate_Parents;
  var url="/powerful/adminTopicsMag/"+idCat;
  topicModel.delete(req.body.IDCate_Child)
    .then(n => {
      res.redirect(url);
    }).catch(err => {
      console.log(err);
    })   
  }catch(error){
    next(error);
  }
})

//edit categories

router.get('/editCategory/:id', (req, res) => {
  if(req.isAuthenticated() && req.isAdmin){
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('guest/vwPowerful/editCategory', { error: true });
      return;
    }
  
    categoryModel.single(id).then(rows => {
      if (rows.length > 0) {
        
        res.render('guest/vwPowerful/editCategory', {
          error: false,
          category: rows[0]
        });
      } else {
         
        res.render('guest/vwPowerful/editCategory', { error: true });
      }
    }).catch(err => {
      console.log(err);
    });    

  }
  else{
    res.redirect('/account/login');
  }
    
  })
router.post('/update', (req, res) => {
  try{
    categoryModel.update(req.body)
    .then(n => {
     
      res.redirect('/powerful/adminCateMag');
    }).catch(err => {
      console.log(err);
    })    
  }catch(error){
    next(error);
  }
  })
router.post('/delete', (req, res) => {
  try{
    categoryModel.delete(req.body.IDCate_Parents)
      .then(n => {
        res.redirect('/powerful/adminCateMag');
      }).catch(err => {
        console.log(err);
      })  
  }catch(error){
    next(error);
  }
  })
    
router.get('/addCategory', (req, res, next) => {
  if(req.isAuthenticated() && req.isAdmin){
    res.render('guest/vwPowerful/addCategory'); 

  }
  else{
    res.redirect('/account/login');
  }
    
})
router.post('/addCategory', (req, res, next) => {
  try{
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
  }catch(error){
    next(error);
  }
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