var db=require('../utills/db')

module.exports={
    allPostComments:(idPost,limit,offset)=>{
       return db.load(`select IDComment,FKIDPost,FKIDUser,Like_of_Comment,ContentComment,username
       from postcomment inner join post on fkidpost=idpost
       inner join account on fkiduser=idaccount
       where idpost='${idPost}' limit ${limit} offset ${offset}`) ;
    },
    countComment:id=>{
      return db.load(`select count (*) as 'total'
       from postcomment inner join post on fkidpost=idpost
       inner join account on fkiduser=idaccount
       where idpost='${id}'`) ;
    },
    add: entity => {
        return db.add('postcomment',  entity);
      },
}