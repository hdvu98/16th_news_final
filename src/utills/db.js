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


  module.exports={
    load:sql=>{
        return new Promise((resolve,reject)=>{
            var connection=createConnection();
            connection.connect();
    
            connection.query(sql,(error,result,fields)=>
              {
                if(error)
                {
                reject(error);
                }      
                else{
                    resolve(result);
                }

                  connection.end();
              });
        });
    }
  }