const mysql = require('mysql');
const rds_config= require("./rds_config");

exports.handler = (event, context, callback) => {
        let connection = mysql.createConnection({
            host: rds_config.rds_host,
            user: rds_config.db_username,
            password: rds_config.db_password,
            database: rds_config.db_name,
            port: rds_config.rds_port
        });
        let where="";
        if(event.source && event.source_key){
          where+= ` and ${event.source_key}=${event.source[event.source_key]}`;
        }
        let args=event.args;
        if(args.where){
          args.where.map((current_where)=>{
            switch(current_where.type){
              case "Int":
                where+= ` and ${current_where.field}=${current_where.value}`;
                break;
              case "String":
                where+= ` and ${current_where.field}='${current_where.value}'`;
                break
              default:
                where+= ` and ${current_where.field}=${current_where.value}`;
                break;
            }
            return true;
          });
        }
        let limit=args && args.limit?`limit ${args.limit}`:``;
        let order=args && args.order?`order by  ${args.order}`:``;
        let index=args && args.index?`use index  (${args.index})`:``;
        let groupby=args && args.group_by?`group by  ${args.group_by}`:``;
        let sql_message=`select ${event.table}.${event.key_table} as ${event.as_key}, ${event.table}.* from ${event.table} ${index} where 1=1    ${where}    ${order} ${groupby} ${limit};`;
        connection.connect(function(err) {
          if (err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
          console.log('connected as id ' + connection.threadId);
        });

        connection.beginTransaction(function(err) {
          if (err) { throw err; }
          connection.query(sql_message, function(err, result) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }         let response={
                        items:result
                      }
                      if(event.object==1){
                        callback(err,result[0]);
                      }else{
                          callback(err,result);

                      }

                      connection.end(function (err) { callback(err, response);});

            });
          });



};
