import * as db from "../database/database.js"


/**
 *
 * @param {string} customerName
 * @param {express.Response} res
 */
 export function insertCustomer (customerName, res) {
    // controllo che la stringa non sia vuota
    if (customerName.length === 0) {
      res.status(400).json({
        status: 'KO',
        message: 'Customer name invalid'
      })
    } 
    const dbConn = db.openDB()
    dbConn.connect()
    const query = "insert into customers(name) values('" + customerName + "')"
    console.log(query)
    dbConn.query(query, function (error, results) {
      dbConn.end()
      if (error) throw error
  
      console.log('Created customer with id ' + results.insertId)
      if (results.affectedRows === 0) {
        res.status(400).json({
          status: 'KO',
          message: 'Customer not created'
        })
      } else {
        res.json({
          status: 'OK',
          message: 'Customer created'
        })
      }
    })
  }
  
  /**
   *
   * @param {int} customerId
   * @param {string} customerName
   * @param {express.Response} res
   */
  export function updateCustomer (customerId, customerName, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = "update customers set name = '" + customerName + "' where customer_id = " + customerId
    console.log(query)
    dbConn.query(query, function (error, results) {
      dbConn.end()
      if (error) throw error
      console.log('Affected rows ' + results.affectedRows)
      if (results.affectedRows === 0) {
        res.status(400).json({
          status: 'KO',
          message: 'Customer not updated'
        })
      } else {
        res.json({
          status: 'OK',
          message: 'Customer updated'
        })
      }
    })
  }
  
  /**
   *
   * @param {int} customerId
   * @param {express.Response} res
   */
  export function deleteCustomer (customerId, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = 'delete from customers where customer_id = ' + customerId
    console.log(query)
    dbConn.query(query, function (error, results) {
      dbConn.end()
      if (error) throw error
      console.log('Deleted customer with id ' + customerId)
      if (results.affectedRows === 0) {
        res.status(404).json({
          status: 'OK',
          message: 'Customer not found'
        })
      } else {
        res.json({
          status: 'OK',
          message: 'Customer deleted'
        })
      }
    })
  }
  
  /**
   *
   * @param {int} customerId
   * @param {express.Response} res
   */
  export function getCustomer (customerId, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = 'select * from customers where customer_id = ' + customerId
    console.log(query)
    dbConn.query(query, function (error, results) {
      dbConn.end()
      if (error) throw error
      console.log('Read customer with id ' + customerId)
      if (results.length === 1) {
        res.json(results[0])
      } else {
        res.status(404).json({})
      }
    })
  }