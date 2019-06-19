var db=require('../utills/db')

module.exports={
    update: entity => {
        return db.update('editor_post', 'ID_EPost', entity);
    },
    add:entity=>{
        return db.add('editor_post', entity);
    }
}