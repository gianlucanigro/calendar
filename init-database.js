'use strict'

const mysql = require('mysql')
const fs = require('fs')

const connection = mysql.createConnection({
  multipleStatements: true,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'pippo123',
  database: 'calendar'
})

fs.readFile('./init-database.sql', 'utf8', function (error, sqlfile) {
  if (error) throw error
  connection.connect(function (error) {
    if (error) throw error
    connection.query(sqlfile, function (err, results) {
      if (err) throw err
      console.log(results)
    })
  })
})
