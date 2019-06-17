var db=require('../utills/db')

module.exports={
    all:()=>{
        return db.load('Select * from news.cate_parents where Status_parentscate=0');
    },
    categoryWithTopics:()=>{
        return db.load('Select * from news.cate_parents left join news.cate_child on IDCate_Parents=FKIDCate_Parents where Status_parentscate=0');
    },
    single : id=>{
        return db.load(`Select * from news.cate_parents where  IDCate_Parents = '${id}' and Status_parentscate=0`);
    },
    singleByName: name=>{
        return db.load(`Select * from news.cate_parents where  Name_parentscate = '${name}' and Status_parentscate=0`);
    },
    categoryWithTopicsByName: name=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDCate_Parents=FKIDCate_Parents where Name_parentscate = '${name}' and Status_parentscate=0`);
    },
    categoryWithTopicsByID: id=>{
        return db.load(`Select * from news.cate_parents left join news.cate_child on IDCate_Parents=FKIDCate_Parents where  IDcate_parents = '${id}' and Status_parentscate=0`);
    },
    add: entity => {
        return db.add('cate_parents', entity);
    },
    update: entity => {
        return db.update('cate_parents', 'IDCate_Parents', entity);
    },
    
    delete: id => {
        return db.delete('cate_parents', 'Status_parentscate','IDCate_Parents', id);
    }

}