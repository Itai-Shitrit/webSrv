const mysql=require('mysql2');
const conn=mysql.createConnection(
{
    host:process.env.MYSQLSRV,
    user:process.env.MYSQLUSER,
    password:process.env.MYSQLPASS,
    port:process.env.MYSQLPORT,
    database:process.env.MYSQLDB
}
); // יצירת אובייקט מסוג חיבור לבסיס הנתונים
module.exports=conn;

