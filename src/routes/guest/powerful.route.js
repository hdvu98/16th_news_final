var express = require('express');
var multer=require('multer');
var router = express.Router();
var moment = require('moment');
var categoryModel = require('../../models/Category.model');
var topicModel = require('../../models/Topic.model');
var postModel=require('../../models/Post.model');
var tagModel=require('../../models/Tag.model');

var AcceptInfo=require('../../models/AcceptInfo.model')

var userModel=require('../../models/user.model');

//require('../../middlewares/upload')(router);

// post status: 0 public/ 1 chờ đăng/  2 chờ duyệt / 3 từ chối tuyệt /4 xóa
router.get('/editorMag', (req, res, next) => {
  if(req.isAuthenticated())
  {
    if(req.user.Type_account==2)
    {
    var limit = 10; 
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
      var posts=postModel.allByEditor(req.user.IDAccount,limit,offset);
      Promise.all([posts]).then(([posts])=>{
        //Phân trang
        if(posts!=null)
        { 
          console.log(posts);
          var pages = [];
          var total = posts.length;
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
    }      
        res.render('guest/vwPowerful/editorMag',{posts,pages});
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
router.get('/vip',(req,res,next)=>{
  if(req.isAuthenticated())
  {
    if(req.user.Vip==1 & req.user.VipExp<=7)
    {
      var limit = 10; 
      var page = req.query.page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * limit;
      var posts=postModel.allVipPost('0','1',limit,offset);
      Promise.all([posts]).then(([posts])=>{
        var pages = [];
        var total = posts.length;
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
        res.render('guest/vwPowerful/vwVip/vwVip',{posts,pages,first,last});

      }).catch(err=>{
        console.log(err);
        res.eng('error occured');
      });
    
    }
    else{
      res.redirect('/');
    }
  }else{
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

router.get('/raw/:id',(req, res, next) => {
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

router.post('/Editor/accept/:id',(req,res,next)=>{
  try{
    var id=req.params.id;
    var date=req.body.pdate;
  
     var acceptInfo={
      FKPost:id,
      FKEditor:req.user.IDAccount,
      PublishDate: date
     }
     var entity = {
      IDPost:id,     
      Status_post: 1
     }
    var post=postModel.update(entity);
    var info=AcceptInfo.add(acceptInfo);
    Promise.all([post,info]).then(([post,info])=>{
      res.redirect('/powerful/editorMag');
    }).catch(err => {
      console.log(err);
    });
    }catch(error){
      next(error);
    }
})
router.post('/Editor/deny/:id',(req,res,next)=>{
  try{
    var id=req.params.id;
    var entity = {
      IDPost:id,
      Status_post: 3,
     }
    postModel.update(entity).then(rows => {
      res.redirect(req.get('referer'));
    }).catch(err => {
      console.log(err);
    });
    }catch(error){
      next(error);
    }
})
router.get('/editorAccept',(req,res,next)=>{
  if(req.isAuthenticated())
  {
    if(req.user.Type_account==2)
    {
    var limit = 10; 
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
      var posts=postModel.allAccepted(req.user.IDAccount,limit,offset);
      Promise.all([posts]).then(([posts])=>{
        //Phân trang
        if(posts!=null)
        { 
          console.log(posts);
          var pages = [];
          var total = posts.length;
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
    }      
        res.render('guest/vwPowerful/vwEditor/AcceptedPosts',{posts,pages});
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
router.post('/postMagWriter/delete/:id',(req, res, next) => {
  try{
    var id=req.params.id;
    var entity = {
      IDPost:id,
      Status_post: 4,
     }
    postModel.update(entity).then(rows => {
      res.redirect('/powerful/postMagWriter');
    }).catch(err => {
      console.log(err);
    });
    }catch(error){
      next(error);
    }
  
})

//route admin category management page

router.get('/adminCateMag', (req, res, next) => {
  if(req.isAuthenticated() && req.user.Type_account==3){
    
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
  if(req.isAuthenticated() && req.user.Type_account==3){
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
  if(req.isAuthenticated() && req.user.Type_account==3){
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
  if(req.isAuthenticated() && req.user.Type_account==3){
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
  
  if(req.isAuthenticated() && req.user.Type_account==3){
    
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
  if(req.isAuthenticated() && req.user.Type_account==3){
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

//admin member Mag

router.get('/adminMemberMag', (req, res, next) => {
  if(req.isAuthenticated() && req.user.Type_account==3)
  {
    var limit = 10; 
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
      var mem=userModel.allByMem(limit,offset);
      var count=userModel.countByMem();
      Promise.all([mem,count]).then(([mem,count])=>{

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
        nPosts=mem.length;
        for (i = 0; i <nPosts ; i++) {
          Yes= false;
          No=false;
      	  post=mem[i];
          if(mem[i].Vip==1)
          {
            Yes=true;
          }    
          else{
            No=true;
          }
          
          var obj = {
          post,
          Yes,
	        No
          }
          post_status.push(obj);
        }
        res.render('guest/vwPowerful/adminMemberMag',{post_status,pages});
      }).catch(err=>{
        console.log(err);
        res.eng('error occured');
    });

  }
  else{
    res.redirect('/account/login');
  }
 
})

router.get('/editMember/:id', (req, res) => {
  
  if(req.isAuthenticated() && req.user.Type_account==3){
    
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('guest/vwPowerful/editMember', { error: true });
      return;
    }
  
    userModel.single(id).then(rows => {
      if (rows.length > 0) {
        
        res.render('guest/vwPowerful/editMember', {
          error: false,
          mem: rows[0]
        });
      } else {
         
        res.render('guest/vwPowerful/editMember', { error: true });
      }
    }).catch(err => {
      console.log(err);
    });    

  }
  else{
    res.redirect('/account/login');
  }
    
  })

  router.post('/updateMember', (req, res,next) => {
    try{
      var day = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
      console.log(day);
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var now = new Date();
      console.log(now);
      var vip=0;
      var parts = day.match(/(\d+)/g);
      var dayEx= new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
      var diffDays = Math.round(Math.abs((dayEx.getTime() - now.getTime())/(oneDay)));
      if((diffDays)>=7){
        vip=1;
      }
      var entity={
        IDAccount:req.body.IDAccount,
        VipDate:day,
        Vip:vip
      }
      userModel.update(entity)
        .then(n => {
         
          res.redirect('/powerful/adminMemberMag');
        }).catch(err => {
          console.log(err);
        })    
    
    }catch(error){
      next(error);
    }
  })
  router.post('/deleteMember', (req, res) => {
  
    try{
      var id = req.params.id;
    
    userModel.delete(id)
      .then(n => {
        res.redirect('/powerful/adminMemberMag');
      }).catch(err => {
        console.log(err);
      })   
    }catch(error){
      next(error);
    }
  })
  

router.get('/adminPostMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminPostMag');
})
router.get('/adminWriterMag', (req, res, next) => {
    res.render('guest/vwPowerful/adminWriterMag');
})

//Admin Tag Management

router.get('/adminTagMag', (req, res, next) => {
  if(req.isAuthenticated() && req.user.Type_account==3)
  {
    
    var limit = 5; 
    var page=req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
      var tagpost=tagModel.allByTag(limit,offset);
      var count=tagModel.countByTag();
      Promise.all([tagpost,count]).then(([tagpost,count])=>{

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

        
              
 
        res.render('guest/vwPowerful/adminTagMag',{tagpost,pages});
      }).catch(err=>{
        console.log(err);
        res.eng('error occured');
    });
     

  }
  else{
    res.redirect('/account/login');
  }
 
})

router.get('/addTag', (req, res, next) => {
  if(req.isAuthenticated() && req.user.Type_account==3){
    res.render('guest/vwPowerful/addTag'); 

  }
  else{
    res.redirect('/account/login');
  }
    
})
router.get('/is-exitsTag', (req, res, next) => {
  var nameTag = req.query.tagName;
  tagModel.singleByNameTag(nameTag).then(rows => {
    console.log(rows.length);
    if (rows.length > 0)
      {
        
        return res.json(false);
      }

    return res.json(true);
  });
})
router.get('/is-exitsTopic', (req, res, next) => {

  var name = req.query.topicName;
  
  topicModel.singleByName(name).then(rows => {
    console.log(rows.length);
    if (rows.length > 0)
      {
        
        return res.json(false);
      }

    return res.json(true);
  });
})
router.get('/is-exitsCat', (req, res, next) => {
  var name = req.query.CatName;
  categoryModel.singleByName(name).then(rows => {
    console.log(rows.length);
    if (rows.length >0 )
      {
        
        return res.json(false);
      }

    return res.json(true);
  });
})
router.get('/is-exitsEditCat', (req, res, next) => {
  
  var name = req.query.Name_parentscate;
  console.log(name);
  categoryModel.singleByEditName(name).then(rows => {
    console.log(rows.length);
    if (rows.length > 0)
      {
        
        return res.json(false);
      }

    return res.json(true);
  });
})
router.get('/is-exitsEditTag', (req, res, next) => {
  
  var name = req.query.Name_tag;
  
  tagModel.singleByEditName(name).then(rows => {
    console.log(rows.length);
    if (rows.length > 0)
      {
        
        return res.json(false);
      }

    return res.json(true);
  });
})
router.get('/is-exitsEditTopic', (req, res, next) => {
  
  var name = req.query.Name_childcate;
  
  topicModel.singleByEditName(name).then(rows => {
    //console.log(rows.length);
    if (rows.length > 0)
      {
        
        return res.json(false);
      }

    return res.json(true);
  });
})
router.post('/addTag', (req, res, next) => {
  try{
    var entity={
      Name_tag:req.body.tagName,
      Status_Tag:0
  }
  tagModel.add(entity)
  .then(id => {
    console.log(id);
    res.render('guest/vwPowerful/addTag');
  }).catch(err => {
    console.log(err);
  })
  }catch(error){
    next(error);
  }
})

router.get('/editTag/:id', (req, res) => {
  
  if(req.isAuthenticated() && req.user.Type_account==3){
    
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('guest/vwPowerful/editTag', { error: true });
      return;
    }
  
    tagModel.singleByID(id).then(rows => {
      if (rows.length > 0) {
        
        res.render('guest/vwPowerful/editTag', {
          error: false,
          tags: rows[0]
        });
      } else {
         
        res.render('guest/vwPowerful/editTag', { error: true });
      }
    }).catch(err => {
      console.log(err);
    });    

  }
  else{
    res.redirect('/account/login');
  }
    
  })

  router.post('/updateTag', (req, res) => {
    try{
      
     
      var entity={
        IDTAG:req.body.IDTAG,
        Name_tag:req.body.Name_tag
      }
      tagModel.update(entity)
        .then(n => {
         
          res.redirect('/powerful/adminTagMag');
        }).catch(err => {
          console.log(err);
        })    
    
    }catch(error){
      next(error);
    }
  })
  router.post('/deleteTag', (req, res) => {
    try{
      tagModel.delete(req.body.IDTAG)
        .then(n => {
          res.redirect('/powerful/adminTagMag');
        }).catch(err => {
          console.log(err);
        })  
    }catch(error){
      next(error);
    }
    })
module.exports = router;