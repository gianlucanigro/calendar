"use strict"

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'pippo123',
  database : 'calendar'
});
 
connection.connect();
 
connection.query('SELECT * from customers', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();