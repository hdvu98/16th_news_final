var db=require('../utills/db')

module.exports={
    all:()=>{
        return db.load('Select * from news.cate_child');
    },
    topicByID:(id)=>{
        return db.load('Select * from news.cate_child where IDCate_Child=${id}');
    },
    topicWithCateByID: id=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDcate_parents=FKIDCate_Parents where  IDCate_Child= '${id}'`);
    },
    allWhitCate:()=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDcate_parents=FKIDCate_Parents`);
    }
}