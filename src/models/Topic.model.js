var db=require('../utills/db')

module.exports={
    all:()=>{
        return db.load('Select * from news.cate_child where Status_childcate=0');
    },
    topicByID:(id)=>{
        return db.load(`Select * from news.cate_child where IDCate_Child='${id}' and Status_childcate=0`);
    },
    topicWithCateByID: id=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDcate_parents=FKIDCate_Parents where  IDCate_Child= '${id}' and Status_childcate=0`);
    },
    topicFromParentsCateByID: id=>{
        return db.load(`Select Status_parentscate,IDCate_Child,Name_childcate,Name_parentscate from news.cate_child,news.cate_parents  where  FKIDCate_Parents= '${id}' and Status_childcate=0 and IDCate_Parents=FKIDCate_Parents`);
    },
    allWhitCate:()=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDcate_parents=FKIDCate_Parents`);
    }
}