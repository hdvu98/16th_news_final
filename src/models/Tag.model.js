var db=require('../utills/db')

module.exports={
    allPostTags:idPost=>{
       return db.load(`select * from tag inner join tag_post on idtag=fktag
       inner join post on fkPost=idpost
       where idpost='${idPost}' and Status_Tag=0`) ;
    },
    singleByID:id=>{
        return db.load(`select * from tag 
       where idtag='${id}' and Status_Tag=0`) ;
    },
    singleByNameTag:name=>{
        return db.load(`select * from tag 
       where Name_tag='${name}' and Status_Tag=0`) ;
    },
    singleByEditName: name=>{
        return db.load(`Select * from news.tag where  Name_tag = '${name}' and Status_Tag =0`);
    },
    allCountPost:()=>{
        return db.load('select tag.IDTAG as ID, tag.Name_tag as Name, count(tp.FKPost) as countpost from tag as tag left join tag_post as tp on tp.FKTag=tag.IDTAG group by ID,Name order by ID ASC')
    },
    add: entity => {
        return db.add('tag', entity);
    },
    update: entity => {
        return db.update('tag', 'IDTAG', entity);
    },
    
    delete: id => {
        return db.delete('tag', 'Status_Tag','IDTAG', id);
    }
}