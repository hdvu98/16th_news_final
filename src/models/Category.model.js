var db=require('../utills/db')

module.exports={
    all:()=>{
        return db.load('Select * from news.cate_parents');
    },
    categoryWithTopics:()=>{
        return db.load('Select * from news.cate_parents left join news.cate_child on IDcate_parents=FKIDCate_Parents');
    },
    single : id=>{
        return db.load(`Select * from news.cate_parents where  IDCate_Parents = '${id}'`);
    },
    singleByName: name=>{
        return db.load(`Select * from news.cate_parents where  Name_parentscate = '${name}'`);
    },
    categoryWithTopicsByName: name=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDcate_parents=FKIDCate_Parents where Name_parentscate = '${name}'`);
    },
    categoryWithTopicsByID: id=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDcate_parents=FKIDCate_Parents where  IDcate_parents = '${id}'`);
    },
}