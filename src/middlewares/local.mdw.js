var categoryModel=require('../models/Category.model');
var TopicModel=require('../models/Topic.model')
var postModel=require('../models/Post.model')

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
    var post=postModel.allAcceptedPost();
    
    Promise.all([cate,topic,nCate,nTopic,post]).then(([cate,topic,nCate,nTopic,post])=>{
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

    if(post!=null)
    {
        for(i=0;i<post.length;i++)
        {
            
            if(post[i].DayLeft>=0&post[i].Status_post=='1')
            {
                var enity={
                    IDPost:post[i].IDPost,
                    Status_post:0
                }
                postModel.update(enity);
            }
        }
    }
        res.locals.lcCategories=cateMenu;
        next();
    })
}