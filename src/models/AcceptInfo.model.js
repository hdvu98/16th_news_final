var db=require('../utills/db')

module.exports={
    update: entity => {
        return db.update('editor_post', 'FKPost', entity);
    },
    updateAcceptedDate: entity => {
        return db.update('editor_post', 'FKPost','EPost_Status', entity);
    },
    add:entity=>{
        return db.add('editor_post', entity);
    }
}