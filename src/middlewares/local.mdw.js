var categoryModel=require('../models/Category.model');

module.exports=(req,res,next)=>{
    categoryModel.all().then(rows=>{
        res.locals.lcCategories=rows;
        next();
    })
}