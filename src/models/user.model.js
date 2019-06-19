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
  update: entity => {
    
    return db.update('account', 'IDAccount', entity);
  },

  delete: id => {
    return db.delete('account', 'Status_account','IDAccount', id);
  }
};
