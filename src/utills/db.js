var mysql=require('mysql');

var connString = 'mysql://root:root@localhost/mdb?charset=utf8_general_ci&timezone=-0700';

var createConnection=()=>{
    return connection=mysql.createConnection({
        host:'localhost',
        port: '3306',
        user:'root',
        password:'root',
        database:'news',
        insecureAuth : true
    }); 
}


module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error)
          reject(error);
        else {
          resolve(results);
        }
        connection.end();
      });
    });
  },

  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity, (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.insertId);
        }
        connection.end();
      });
    });
  },

  update: (tableName, idField, entity) => {
    return new Promise((resolve, reject) => {
      var id = entity[idField];
      delete entity[idField];

      var sql = `update ${tableName} set ? where ${idField} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, [entity, id], (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    });
  },

  delete: (tableName, Status,idField, id) => {
    return new Promise((resolve, reject) => {
      var sql = `update  ${tableName} set ${Status} =1 where ${idField} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, id, (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  },
};