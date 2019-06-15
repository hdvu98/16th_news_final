var db=require('../utills/db')

module.exports = {
  all: () => {
    return db.load('select * from account');
  },

  single: id => {
    return db.load(`select * from account where IDAccount = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from account where Username = '${userName}'`);
  },
  TypeByID: id => {
    return db.load(`select Type_account  from account where IDAccount  = '${id}'`);
  },
  add: entity => {
    return db.add('account', entity);
  },

  update: entity => {
    var id = entity.f_ID;
    delete entity.f_ID;
    return db.update('account', 'IDAccount', entity, id);
  },

  delete: id => {
    return db.delete('account', 'IDAccount', id);
  }
};
