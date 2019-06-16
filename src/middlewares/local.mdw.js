var categoryModel=require('../models/Category.model');
var TopicModel=require('../models/Topic.model')

module.exports=(req,res,next)=>{
    categoryModel.all().then(rows=>{
        res.locals.lcCategories=rows;
        
    });
    TopicModel.allWhitCate().then(rows=>{
        res.locals.lcTopics=rows;
        next();
    })
}