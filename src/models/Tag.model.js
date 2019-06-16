var db=require('../utills/db')

module.exports={
    allPostTags:idPost=>{
       return db.load(`select * from tag inner join tag_post on idtag=fktag
       inner join post on fkPost=idpost
       where idpost='${idPost}' and Status_Tag=0`) ;
    }
}