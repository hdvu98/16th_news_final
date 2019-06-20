var db=require('../utills/db')

module.exports = {
  all: () => {
    return db.load('select * from account and Status_account=0');
  },

  single: id => {
    return db.load(`select * from account where IDAccount = ${id} and Status_account=0`);
  },
  singleByUserName: userName => {
    return db.load(`select *,DATEDIFF(now(), vipdate) as'VipExp' from account where Username = '${userName}' and Status_account=0`);
  },
  checkyourPassword: id => {
    return db.load(`select * from account where IDAccount = '${id}' and Status_account=0`);
  },
  singleSameAsUserName: (userName,id)=> {
    return db.load(`select * from account where Username = '${userName}' and Status_account=0 and IDAccount !='${id}'`);
  },
  TypeByID: id => {
    return db.load(`select Type_account  from account where IDAccount  = '${id}' and Status_account=0`);
  },

  add: entity => {
    return db.add('account', entity);
  },
  
  allByMem:(limit,offset)=>{
    return db.load(`select *,DATE_FORMAT(VipDate, "%d %m %Y") as 'VipDate' from account where Type_account  = 0 and Status_account=0
    limit ${limit} offset ${offset}`);
  },
  countByMem:()=>{
    return db.load('Select count(*) as total from account where Type_account  = 0 and Status_account = 0') ;
  },
  allByWriter:(limit,offset)=>{
    return db.load(`select acc.IDAccount as IDAccount, acc.Username as Username,cate.Name_parentscate as namecate from account 
        as acc ,editor_cate as ec, cate_parents as cate where acc.Type_account  = 1 and acc.Status_account=0  and acc.IDAccount=ec.FKEditor and ec.FKCate=cate.IDCate_Parents order by IDAccount ASC
        limit ${limit} offset ${offset}`);
  },
  countByWriter:()=>{
    return db.load('Select count(*) as total from account where Type_account  = 1 and Status_account = 0') ;
  },
  allByEditor:(limit,offset)=>{
    return db.load(`select acc.IDAccount as IDAccount, acc.Username as Username,cate.Name_parentscate as namecate from account 
        as acc ,editor_cate as ec, cate_parents as cate where acc.Type_account  = 2 and acc.Status_account=0  and acc.IDAccount=ec.FKEditor and ec.FKCate=cate.IDCate_Parents order by IDAccount ASC
        limit ${limit} offset ${offset}`);
  },
  countByEditor:()=>{
    return db.load('Select count(*) as total from account where Type_account  = 2 and Status_account = 0') ;
  },
  singleWriterByID:(id)=>{
    return db.load(`select acc.IDAccount as IDAccount, acc.Username as Username,ec.EC_ID as EC_ID ,cate.Name_parentscate as Name_parentscate from account 
        as acc ,editor_cate as ec, cate_parents as cate where acc.IDAccount  = '${id}' and acc.Status_account=0  and acc.IDAccount=ec.FKEditor and ec.FKCate=cate.IDCate_Parents order by IDAccount ASC`)
  },
  update: entity => {
    
    return db.update('account', 'IDAccount', entity);
  },

  delete: id => {
    return db.delete('account', 'Status_account','IDAccount', id);
  }
};
