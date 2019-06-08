var express=require('express');
var exphbrs=require('express-handlebars');
var categoryModel=require('./models/Category.model');
var topicModel=require('./models/Topic.model');
var postModel=require('./models/Post.model');
var morgan=require('morgan');

var app=express();
app.engine('hbs',exphbrs({
    defaultLayout:'main.hbs',
    layoutsDir:'views/_layouts'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
//app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/Category',require('./routes/guest/category.route'));
app.use(require('./middlewares/local.mdw'));

app.set('view engine','hbs');

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
    var post,trending,Tags,Comments;
    postModel.singleFullInfo(id).then(rows=>{
        post=rows;
        postModel.topTrending().then(trends=>{
            trending=trends;
            res.render('guest/vwSinglePost/SinglePost',{post,trending});
        }).catch(err=>{
            console.log(err);
            res.end('error occured');
        });
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    });


});
// app.get('/:category',(req,res)=>{
//     var category=req.params.category;
//     var topics,category,posts;

//     categoryModel.categoryWithTopicsByName(category).then(rows=>{
//               topics=rows;
//     }).catch(err=>{
//         console.log(err);
//         res.end('error occured');
//     });

//     categoryModel.singleByName(category).then(cate=>{
//             category=cate;
//     }).catch(err=>{
//         console.log(err);
//         res.end('error occured');
//     });

//     postModel.allByCate(category).then(postsCate=>{
//         posts=postsCate;
//     }).catch(err=>{
//         console.log(err);
//         res.end('error occured');
//     });

//     postModel.topTrendingCate(category).then(trends=>{
//         res.render('guest/vwCategory/Category',{topics,category,posts,trending:trends});
//     }).catch(err=>{
//         console.log(err);
//         res.end('error occured');
//     });
// });

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
