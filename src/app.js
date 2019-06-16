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
    var category=req.params.category;
    categoryModel.categoryWithTopicsByName(category).then(rows=>{
        categoryModel.singleByName(category).then(cate=>{
            postModel.allByCate(category).then(postsCate=>{
                //res.render('guest/vwCategory/Category',{topics:rows,category:cate,posts:postsCate});

                postModel.topTrendingCate(category).then(trends=>{
                    res.render('guest/vwCategory/Category',{topics:rows,category:cate,posts:postsCate,trending:trends});
                }).catch(err=>{
                    console.log(err);
                    res.end('error occured');
                });

            }).catch(err=>{
                console.log(err);
                res.end('error occured');
            });

        }).catch(err=>{
            console.log(err);
            res.end('error occured');
        })
        
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    });
});

app.get('/post/:id',(req,res)=>{

    var id=req.params.id;
    var post,similarPost,Tags,Comments;
    postModel.singleFullInfo(id).then(rows=>{
        post=rows;
        tagsModel.allPostTags(id).then(TagsRows=>{
            
            commentsModel.allPostComments(id).then(cmtRows=>{
                var cmtRows=cmtRows;
                postModel.Top5ByTopic(id).then(similarPost=>{
                    console.log(cmtRows);
                    res.render('guest/vwSinglePost/SinglePost',{post,Tags:TagsRows,Comments:cmtRows,similarPost:similarPost});
                }).catch(err=>{
                    console.log(err);
                    res.end('error occured');
                });
            }).catch(err=>{
                console.log(err);
                res.end('error occured');
            });
        }).catch(err=>{
            console.log(err);
            res.end('error occured');
        });
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    });


});

app.get('/:category/:topic',(req,res)=>{
    var category=req.params.category;
    var id=req.params.topic;
    topicModel.topicWithCateByID(id).then(rows=>{
       
        postModel.alllByTopic(id).then(postRows=>{

            postModel.topTrendingTopic(id).then(trends=>{

                res.render('guest/vwTopic/Topic',{topics:rows,posts:postRows,trending:trends});

            }).catch(err=>{
                console.log(err);
                res.end('error occured');
            })
       
            
        }).catch(err=>{
            console.log(err);
            res.end('error occured');
        })
        
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    })
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