"use strict";


function openDB() {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'pippo123',
        database: 'calendar'
    });
    return connection;
}

function insertCustomer(conn, customerName) {
    let query = "insert into customers(name) values('" + customerName + "')";
    console.log(query);
    conn.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Created customer with id ' + results.insertId);
    });
}

function updateCustomer(conn, customerId, customerName) {
    let query = "update customers set name = '" + customerName + "' where customer_id = " + customerId;
    console.log(query);
    conn.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Affected rows ' + results.affectedRows);
    });
}

function deleteCustomer(conn, customerId) {
    let query = "delete from customers where customer_id = " + customerId;
    console.log(query);
    conn.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Deleted customer with id ' + customerId);
    });
}

function listCustomers(conn) {
    let query = "select * from customers";
    console.log(query);
    conn.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Customers');
        console.log(results);
    });
}


const mysql = require('mysql');

const connection = openDB();

connection.connect();

const action = process.argv[2];
const firstArg = process.argv[3];
const secondArg = process.argv[4];
const thirdArg = process.argv[5];

switch (action) {
    case 'insert': insertCustomer(connection, firstArg + ' ' + secondArg); break;
    case 'modify': updateCustomer(connection, firstArg, secondArg + ' ' + thirdArg); break;
    case 'delete': deleteCustomer(connection, firstArg); break;
    case 'list': listCustomers(connection); break;
}

connection.end();


