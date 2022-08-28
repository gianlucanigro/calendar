'use strict'

import * as customers from "./customers/customers.js"

import * as db from "./database/database.js"

import express from 'express'

import bodyParser from 'bodyparser'


// check db availability

const checkDb = db.openDB()
checkDb.connect(function (error) {
  if (error) throw error
})
checkDb.end()


const app = express()

const port = process.env.PORT || 3000



const jsonParser = bodyParser.json()

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

app.listen(port)
