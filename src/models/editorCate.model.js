var db=require('../utills/db')

module.exports = {
 
  
  add: entity => {
    return db.add('editor_cate', entity);
  },
  update: entity => {
    
    return db.update('editor_cate', 'EC_ID', entity);
  }
};
