var express=require('express');
var exphbrs=require('express-handlebars');
var categoryModel=require('./models/Category.model');
var topicModel=require('./models/Topic.model');
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
    res.render('index.hbs');
   
});

app.get('/:category',(req,res)=>{
    var category=req.params.category;
    categoryModel.categoryWithTopicsByName(category).then(rows=>{
        categoryModel.singleByName(category).then(cate=>{
            console.log(cate);
        res.render('guest/vwCategory/Category',{topics:rows,category:cate});
        })
        
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    })
});

app.get('/:category/:topic',(req,res)=>{
    var category=req.params.category;
    var id=req.params.topic;
    topicModel.topicWithCateByID(id).then(rows=>{
       
        res.render('guest/vwTopic/Topic',{topics:rows});
        
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    })
});

app.listen('3000',()=>{
    console.log('web server is running at http://localhost:3000');
})
