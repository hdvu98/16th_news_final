var db=require('../utills/db')

module.exports = {
 
  
  add: entity => {
    return db.add('editor_cate', entity);
  }
};
