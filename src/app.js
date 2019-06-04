var express=require('express');
var exphbrs=require('express-handlebars');
var app=express();
app.engine('hbs',exphbrs({
    defaultLayout:'main.hbs',
    layoutsDir:'views/_layouts'
}));

app.use(express.static('public'));

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('index.hbs');
})

app.listen('3000',()=>{
    console.log('web server is running at http://localhost:3000');
})