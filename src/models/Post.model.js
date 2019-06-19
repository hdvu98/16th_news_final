var db=require('../utills/db')

module.exports={
    all:()=>{
        return db.load('Select * from post where Status_post=0 order by datecomplete desc ');
    },
    single : id=>{
        return db.load(`SELECT * FROM post where IDpost = '${id}' and Status_post=0`);
    },
    alllByTopic:(id,limit,offset)=>{
        return db.load(`Select * from post join cate_child on FKCategory =IDCate_child where FKCategory = '${id}' and Status_post=0 
        ORDER BY datecomplete and type_of_post desc
        limit ${limit} offset ${offset}`);
    },
    allByWriter:(id,limit,offset)=>{
        return db.load(`Select * from post  where FKIDWritter_post = '${id}' and Status_post<4
        ORDER BY datecomplete desc
        limit ${limit} offset ${offset}`);
    },
    allByEditor:(id,limit,offset)=>{
        return db.load(`Select * from post join cate_child on FKCategory =IDCate_child
        join editor_cate on FKIDCate_Parents=FKCate
        left join account on FKIDWritter_post=IDAccount
        where FKEditor = '${id}' and Status_post='2' 
        ORDER BY datecomplete and type_of_post desc
        limit ${limit} offset ${offset}`);
    },
    allAccepted:(id,limit,offset)=>{
        return db.load(`Select * from post 
        join editor_post on IDPost=FKPost
        left join account on FKIDWritter_post=IDAccount
        where FKEditor = '${id}' and Status_post<'2' 
        ORDER BY datecomplete and type_of_post desc
        limit ${limit} offset ${offset}`);
    }
    ,
    countByWriter:(id)=>{
        return db.load(`Select count(*) as 'total' from post where FKIDWritter_post = '${id}' 
        `);
    }
    ,
    countPostByTopic:id=>{
        return db.load(`Select count(*) as 'total' from post join cate_child on FKCategory =IDCate_child where FKCategory = '${id}' and Status_post=0 
        `);
    },
    Top5ByTopic:id=>{
        return db.load(`Select * from post join cate_child on FKCategory =IDCate_child where FKCategory =( select FKCategory from post where idpost= '${id}') and Status_post=0 limit 5`);
    },
    allByCate:(Name,limit,offset)=>{
        return db.load(`
        SELECT *FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents ON fkidcate_parents  = idcate_parents
        where Name_parentscate='${Name}' and Status_post=0 
        ORDER BY datecomplete  and type_of_post desc limit ${limit} offset ${offset}`);
    },
    countPostByCate:Name=>{
        return db.load(`
        SELECT count(*) as 'total' FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents ON fkidcate_parents  = idcate_parents
        where Name_parentscate='${Name}' and Status_post=0`);
    },
    topTenViews:()=>{
        return db.load(`
        SELECT *FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents c ON fkidcate_parents  = idcate_parents
            where Status_post=0
        ORDER BY num_of_view desc
        LIMIT 10`);
    },
    topLasted:()=>{
        return db.load(`
        SELECT *FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents c ON fkidcate_parents  = idcate_parents
            where Status_post=0
        ORDER BY datecomplete desc
        LIMIT 10`);
    },
    singleLastedByTopic:id=>{
        return db.load(`
        SELECT *FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents c ON fkidcate_parents  = idcate_parents
        where IDCate_child='${id}' and Status_post=0
        ORDER BY datecomplete desc
        LIMIT 1`);
    },
    topTrending:()=>{
        return db.load(`
        SELECT *, ((Num_of_view+num_of_like+num_of_comment)/3) as 'Interactive' FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents c ON fkidcate_parents  = idcate_parents
            where Status_post=0
        ORDER BY Interactive desc
        LIMIT 3`);

    }, 
    topTrendingTopic:id=>{
        return db.load(`
        SELECT *, ((Num_of_view+num_of_like+num_of_comment)/3) as 'Interactive' FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents c ON fkidcate_parents  = idcate_parents
        where IDCate_child='${id}' and Status_post=0
        ORDER BY Interactive desc
        LIMIT 3`);
    },
    topTrendingCate:Name=>{
        return db.load(`SELECT *, ((Num_of_view+num_of_like+num_of_comment)/3) as 'Interactive' FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents c ON fkidcate_parents  = idcate_parents
        where Name_parentsCate='${Name}' and Status_post=0
        ORDER BY Interactive desc
        LIMIT 3`);

    }
    ,
    numOfPostsByCate:()=>{
        return db.load(`SELECT*, count(idpost) as'num_of_posts' FROM cate_parents left join
        (post INNER JOIN cate_child ON FKCategory =IDCate_child )
        ON fkidcate_parents  = idcate_parents
        where Status_post=0
        group by(idcate_parents)`
        );
    },
    allLastedPostByEachTopic:()=>{
        return db.load(`select * from
        ((select f.IDPost,f.Title,f.Thumbnail,f.Status_post,f.FKCategory,f.FKIDWritter_post,f.DateComplete,f.Content,f.Num_of_View,f.Num_of_Like,f.Num_of_Comment,f.Type_of_post
        from (
           select title,idpost, min(datecomplete) as lasted
           from post group by fkcategory
        ) as x inner join post as f on f.idpost = x.idpost and f.datecomplete = x.lasted) as tbPost
        inner join cate_child on tbPost.fkcategory=idcate_child)
        inner join cate_parents on fkidcate_parents=idcate_parents where Status_post=0`
        
        );
    },
    singleFullInfo:id=>{
        return db.load(`SELECT * FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents ON fkidcate_parents  = idcate_parents
            left JOIN news.account On FKIDWritter_post=IDAccount
        where IDpost='${id}' and Status_post=0`)
    },
    singleFullInfoGuest:id=>{
        return db.load(`SELECT * FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents ON fkidcate_parents  = idcate_parents
            left JOIN news.account On FKIDWritter_post=IDAccount
        where IDpost='${id}' and Status_post=0 and type_of_post='0'`)
    }
    ,
    singleRaw:id=>{
        return db.load(`SELECT * FROM post
            INNER JOIN cate_child ON FKCategory =IDCate_child 
            INNER JOIN cate_parents ON fkidcate_parents  = idcate_parents
            INNER JOIN news.account On FKIDWritter_post=IDAccount
        where IDpost='${id}' and Status_post<4`)
    },
    update:entity=>{
        return db.update('post', 'IDPost', entity);
    },
    add: entity => {
        return db.add('post',  entity);
      },
      allPostByTag:(id,limit,offset)=>{
        return db.load(`select * from post inner join tag_post on idpost= FKPost
        inner join tag on fktag=idtag where IDTAG='${id}' and Status_post=0 limit ${limit} offset ${offset}`)
      },
      countPostsByTag:(id)=>{
        return db.load(`select count(*) as 'total' from post inner join tag_post on idpost= FKPost
        inner join tag on fktag=idtag where IDTAG='${id}' and Status_post=0`)

      },
      searchTitle:(key)=>{
        return db.load(`SELECT * FROM news.post WHERE MATCH (title) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0
        ORDER BY datecomplete and Type_of_post desc`);
      },
      countSearchTitle:(key)=>{
        return db.load(`SELECT count(*) as 'total' FROM news.post WHERE MATCH (title) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0`);
      },
      countSearchContent:(key)=>{
        return db.load(`SELECT count(*) as 'total' FROM news.post WHERE MATCH (content) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0`);}
      ,
      countSearchDefault:(key)=>{
        return db.load(`SELECT count(*) as 'total' FROM news.post WHERE MATCH (title,content) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0`);}
      ,
      searchContent:(key)=>{
        return db.load(`SELECT * FROM news.post WHERE MATCH (content) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0 
        ORDER BY datecomplete and Type_of_post desc `);
      },
      searchDefault:(key)=>{
        return db.load(`SELECT * FROM news.post WHERE MATCH (title,content) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0 
        ORDER BY datecomplete and Type_of_post desc `);
      },
      allVipPost:(status,Type,limit,offset)=>{
        return db.load(`Select * from post join cate_child on FKCategory =IDCate_child where 
        Type_of_post= '${Type}' and Status_post='${status}'
        ORDER BY datecomplete desc
        limit ${limit} offset ${offset}`);
      },
      searchVipContent:(key)=>{
        return db.load(`SELECT * FROM news.post WHERE MATCH (content) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0
        ORDER BY datecomplete and Type_of_post desc `);
      },
      searchVipDefault:(key)=>{
        return db.load(`SELECT * FROM news.post WHERE MATCH (title,content) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0
        ORDER BY datecomplete and Type_of_post desc `);
      },
      searchVipTitle:(key)=>{
        return db.load(`SELECT * FROM news.post WHERE MATCH (title) AGAINST ('"${key}" @4' IN BOOLEAN MODE)
        and Status_post=0
        ORDER BY datecomplete and Type_of_post desc`);
      }

}