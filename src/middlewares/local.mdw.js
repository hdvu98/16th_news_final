var categoryModel=require('../models/Category.model');
var TopicModel=require('../models/Topic.model')

module.exports=(req,res,next)=>{
    // categoryModel.all().then(rows=>{
    //     res.locals.lcCategories=rows;
        
    // });
    // TopicModel.allWhitCate().then(rows=>{
    //     res.locals.lcTopics=rows;
    //     next();
    // })
    var cate=categoryModel.all();
    var nCate=categoryModel.count();

    var topic =TopicModel.all();
    var nTopic=TopicModel.count();
    
    Promise.all([cate,topic,nCate,nTopic]).then(([cate,topic,nCate,nTopic])=>{
        var cateMenu=[];
        var nCate=nCate[0].total;
        var nTopic=nTopic[0].total;
    
    for( i=0;i<nCate;i++)
    {
        var topics=[];
        for(j=0;j<nTopic;j++)
        {
            if(cate[i].IDCate_Parents==topic[j].FKIDCate_Parents)
            {
                ob={
                    topicName:topic[j].Name_childcate,
                    cateName:cate[i].Name_parentscate,
                    topicID:topic[j].IDCate_Child
                }
                topics.push(ob);
            }
        }
        obj={
            category:cate[i],
            topics:topics
        }

        cateMenu.push(obj);
    }
        res.locals.lcCategories=cateMenu;
        next();
    })
}