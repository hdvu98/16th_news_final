var db=require('../utills/db')

module.exports={
    allPostComments:idPost=>{
       return db.load(`select IDComment,FKIDPost,FKIDUser,Like_of_Comment,ContentComment,username
       from postcomment inner join post on fkidpost=idpost
       inner join account on fkiduser=idaccount
       where idpost='${idPost}'`) ;
    },
    add: entity => {
        return db.add('postcomment',  entity);
      },
}