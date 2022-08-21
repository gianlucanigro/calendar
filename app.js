"use strict";

/**
 * 
 * @returns {mysql.Connection} 
 */
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

/**
 * 
 * @param {string} customerName 
 * @param {express.Response} res 
 */
function insertCustomer(customerName, res) {
    const dbConn = openDB();
    dbConn.connect();
    let query = "insert into customers(name) values('" + customerName + "')";
    console.log(query);
    dbConn.query(query, function (error, results, fields) {
        dbConn.end();
        if (error) throw error;

        console.log('Created customer with id ' + results.insertId);
        if (results.affectedRows == 0) {
            res.status(400).json({
                status: "KO",
                message: "Customer not created"
            })
        } else {
            res.json({
                status: "OK",
                message: "Customer created"
            });
        }
    });
}

/**
 * 
 * @param {int} customerId 
 * @param {string} customerName 
 * @param {express.Response} res 
 */
function updateCustomer(customerId, customerName, res) {
    const dbConn = openDB();
    dbConn.connect();
    let query = "update customers set name = '" + customerName + "' where customer_id = " + customerId;
    console.log(query);
    dbConn.query(query, function (error, results, fields) {
        dbConn.end();
        if (error) throw error;
        console.log('Affected rows ' + results.affectedRows);
        if (results.affectedRows == 0) {
            res.status(400).json({
                status: "KO",
                message: "Customer not updated"
            })
        } else {
            res.json({
                status: "OK",
                message: "Customer updated"
            });
        }
    });
}

/**
 * 
 * @param {int} customerId 
 * @param {express.Response} res 
 */
function deleteCustomer(customerId, res) {
    const dbConn = openDB();
    dbConn.connect();
    let query = "delete from customers where customer_id = " + customerId;
    console.log(query);
    dbConn.query(query, function (error, results, fields) {
        dbConn.end();
        if (error) throw error;
        console.log('Deleted customer with id ' + customerId);
        if (results.affectedRows == 0) {
            res.status(404).json({
                status: "OK",
                message: "Customer not found"
            })
        } else {
            res.json({
                status: "OK",
                message: "Customer deleted"
            });
        }
    });
}

/**
 * 
 * @param {int} customerId 
 * @param {express.Response} res 
 */
function getCustomer(customerId, res) {
    const dbConn = openDB();
    dbConn.connect();
    let query = "select * from customers where customer_id = " + customerId;
    console.log(query);
    dbConn.query(query, function (error, results, fields) {
        dbConn.end;
        if (error) throw error;
        console.log('Read customer with id ' + customerId);
        if (results.length == 1) {
            res.json(results[0]);
        } else {
            res.status(404).json({});
        }
    });
}



const mysql = require('mysql');

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

app.get('/customer/:id', function (req, res) {
    getCustomer(req.params.id, res);
});

app.post('/customer', jsonParser, function (req, res) {
    console.log(req.body);
    insertCustomer(req.body.name, res);
});

app.patch('/customer/:id', jsonParser, function (req, res) {
    console.log(req.body);
    updateCustomer(req.params.id, req.body.name, res);
});

app.delete('/customer/:id', function (req, res) {
    deleteCustomer(req.params.id, res);
});

app.listen(port);



