var express=require('express');
var categoryModel=require('./models/Category.model');
var topicModel=require('./models/Topic.model');
var postModel=require('./models/Post.model');
var tagsModel=require('./models/Tag.model');
var commentsModel=require('./models/Comment.model');
var exphbs=require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var morgan=require('morgan');
const path=require('path');


var app=express();


app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: path.join(__dirname,'views/_layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
      
      section: hbs_sections()
    }
  }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

  
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));
app.use('/Category',require('./routes/guest/category.route'));
app.use(require('./middlewares/local.mdw'));
app.use('/account', require('./routes/account.route'));
app.use('/powerful', require('./routes/guest/powerful.route'));
app.use('/tag', require('./routes/guest/tags.route'));
app.use(require('./middlewares/auth-locals.mdw'));


app.get('/',(req,res)=>{
    postModel.topLasted().then(topLasted=>{

        postModel.topTenViews().then(topViews=>{

            postModel.topTrending().then(topTrending=>{

                postModel.numOfPostsByCate().then(category=>{

                    postModel.allLastedPostByEachTopic().then(postEachTopic=>{
                        res.render('index.hbs',{topLasted:topLasted,topViews:topViews,topTrending:topTrending,
                            category:category,postEachTopic:postEachTopic});

                    }).catch(err=>{
                        console.log(err);
                        res.eng('error occured');
                    });

    
                }).catch(err=>{
                    console.log(err);
                    res.eng('error occured');
                });

               // res.render('index.hbs',{topLasted:topLasted,topViews:topViews,topTrending:topTrending});

            }).catch(err=>{
                console.log(err);
                res.eng('error occured');
            });

        }).catch(err=>{
            console.log(err);
            res.eng('error occured');
        });

    }).catch(err=>{
        console.log(err);
        res.eng('error occured');
    });

   
});

app.get('/:category',(req,res)=>{
    var limit = 10;
  
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
    var category=req.params.category;

    var rows=categoryModel.categoryWithTopicsByName(category);
    var cate=categoryModel.singleByName(category);
    var postsCate=postModel.allByCate(category,limit,offset);
    var trends=postModel.topTrendingCate(category);
    var count_rows = postModel.countPostByCate(category);
    Promise.all([rows,cate,postsCate,trends,count_rows]).then(([rows,cate,postsCate,trends,count_rows])=>{

        var pages = [];
        var total = count_rows[0].total;

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
    

        res.render('guest/vwCategory/Category',{topics:rows,category:cate,posts:postsCate,trending:trends,pages,first,last});
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    });
});

app.get('/post/:id',(req,res)=>{

    var limit = 10;
  
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
    var category=req.params.category;

    var id=req.params.id;
    var rows=postModel.singleFullInfo(id);
    var TagsRows=tagsModel.allPostTags(id);
    var cmtRows= commentsModel.allPostComments(id,limit,offset);
    var similarPost= postModel.Top5ByTopic(id);
    var countComments=commentsModel.countComment(id);

    Promise.all([rows,TagsRows,cmtRows,similarPost,countComments]).then(([rows,TagsRows,cmtRows,similarPost,countComments])=>{

        var pages = [];
        var total = countComments[0].total;

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
        
        res.render('guest/vwSinglePost/SinglePost',{post:rows,Tags:TagsRows,Comments:cmtRows,similarPost:similarPost,pages,first,last});

    })
    .catch(err=>{
                    console.log(err);
                    res.end('error occured');
                });
});

app.get('/:category/:topic',(req,res)=>{
    var limit = 10;
  
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
    var category=req.params.category;
    var id=req.params.topic;

    var rows= topicModel.topicWithCateByID(id);
    var postRows=postModel.alllByTopic(id,limit,offset);
    var trends= postModel.topTrendingTopic(id);
    var count=postModel.countPostByTopic(id);

    Promise.all([rows,postRows,trends,count]).then(([rows,postRows,trends,count])=>{
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
        res.render('guest/vwTopic/Topic',{topics:rows,posts:postRows,trending:trends,pages,first,last});

    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    });

    
});

app.listen('3000',()=>{
    console.log('web server is running at http://localhost:3000');
})

app.post('/post/:id',(req,res,next)=>{
    if(req.isAuthenticated()){
        try{
    
            var entity = {
              FKIDPost: req.params.id,
              FKIDUser: req.user.IDAccount,
              ContentComment: req.body.message,
              Like_of_Comment:0
             }
             console.log(entity);
            commentsModel.add(entity).then(rows => {
              res.redirect(req.get('referer'));
            })
            }catch(error){
              next(error);
            }

    }
    else{
       next();
    }
    
});