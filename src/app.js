'use strict'

import * as customers from "./customers/customers.js"

import * as booking from "./bookings/bookings.js"

import * as db from "./database/database.js"

import express from 'express'

import bodyParser from 'body-parser'


// check db availability

const checkDb = db.openDB()
checkDb.connect(function (error) {
  if (error) throw error
})
checkDb.end()


const app = express()

const port = process.env.PORT || 3000



const jsonParser = bodyParser.json()

// REST customers

app.get('/customer/:id', function (req, res) {
  customers.getCustomer(req.params.id, res)
})

app.post('/customer', jsonParser, function (req, res) {
  console.log(req.body)
  customers.insertCustomer(req.body.name, res)
})

app.patch('/customer/:id', jsonParser, function (req, res) {
  console.log(req.body)
  customers.updateCustomer(req.params.id, req.body.name, res)
})

app.delete('/customer/:id', function (req, res) {
  customers.deleteCustomer(req.params.id, res)
})

// REST booking
app.get('/booking/:id', function (req, res) {
  booking.getBooking(req.params.id, res)
})

app.post('/booking', jsonParser, function (req, res) {
  console.log(req.body)
  booking.insertUpdateBooking(req.body, res, 'insert')
})

app.patch('/booking/:id', jsonParser, function (req, res) {
  console.log(req.body)
  booking.insertUpdateBooking(req.body, res, 'update', req.params.id)
})

app.delete('/booking/:id', function (req, res) {
  booking.deleteBooking(req.params.id, res)
})


app.listen(port)
