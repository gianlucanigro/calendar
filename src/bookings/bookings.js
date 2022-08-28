import * as db from "../database/database.js"


export function insertUpdateBooking(booking, res, operation, id = 0) {
    if (checkStartEnd(booking.start, booking.end) === false) {
        console.log('Invalid date data')
        res.status(400).json({ status: 'KO', message: 'Invalid date data' })
        return
    }
    checkOverBooking(booking, res, operation, id)
}


/**
 *
 * @param {object} booking
 * @param {Express.Response} res
 */
function insertBooking(booking, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = "insert into booking(customer_id,start,end) values(" + booking.customerId + ",'" + booking.start + "','" + booking.end + "')"
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) {
            res.status(400).json({                status: 'KO',                message: 'Booking not created, invalid customerId'            })
            return
        }
        console.log('Created booking with id ' + results.insertId)
        if (results.affectedRows === 0) {
            res.status(400).json({                status: 'KO',                message: 'Booking not created'            })
        } else {
            res.json({
                status: 'OK',                message: 'Booking created',                bookingId: results.insertId            })
        }
    })
}



/**
 *
 * @param {int} bookigId
 * @param {object} booking
 * @param {Express.Response} res
 */
function updateBooking(bookingId, booking, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = "update booking set customer_id = " + booking.customerId + ", start = '" + booking.start + "',end='" + booking.end + "' where book_id = " + bookingId
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) {
            console.log('Booking not updated, invalid customerId')
            res.status(400).json({ status: 'KO', message: 'Booking not updated, invalid customerId' })
            return
        }
        console.log('Affected rows ' + results.affectedRows)
        if (results.affectedRows === 0) {
            res.status(400).json({ status: 'KO', message: 'Booking not updated' })
        } else {
            res.json({
                status: 'OK', message: 'Booking updated'
            })
        }
    })
}

/**
 *
 * @param {int} bookingId
 * @param {Express.Response} res
 */
export function deleteBooking(bookingId, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = 'delete from booking where book_id = ' + bookingId
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) {
            console.log('Booking not deletes, invalid bookingId')
            res.status(400).json({ status: 'KO', message: 'Booking not deletes, invalid bookingId' })
            return
        }
        console.log('Deleted booking with id ' + bookingId)
        if (results.affectedRows === 0) {
            res.status(404).json({ status: 'OK', message: 'Booking not found' })
        } else {
            res.json({ status: 'OK', message: 'Booking deleted' })
        }
    })
}

/**
 *
 * @param {int} bookingId
 * @param {Express.Response} res
 */
export function getBooking(bookingId, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = 'select * from booking where book_id = ' + bookingId
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) {
            console.log('Booking not retrieved, invalid customerId')
            res.status(400).json({ status: 'KO', message: 'Booking not retrieved, invalid customerId' })
            return
        }
        console.log('Read booking with id ' + bookingId)
        if (results.length === 1) {
            res.json({ status: 'OK', bookId: results[0].book_id, customerId: results[0].customer_id, start: cleanTime(results[0].start), end: cleanTime(results[0].end) })
        } else {
            res.status(404).json({})
        }
    })
}


/**
 * 
 * @param {string} startBooking 
 * @param {string} endBooking 
 * @returns boolean
 * check if date data are valid, in the right order and in the future
 */
function checkStartEnd(startBooking, endBooking) {
    let check = Date.parse(startBooking)
    if (isNaN(check)) {
        return false
    }
    check = Date.parse(endBooking)
    if (isNaN(check)) {
        return false
    }
    let start = new Date(startBooking)
    let end = new Date(endBooking)
    if (end <= start) {
        return false
    }
    let now = new Date();
    if (start <= now || end <= now) {
        return false
    }
    return true
}

/**
 * 
 * @param {object} booking 
 * @param {Express.Response} res 
 * @param {string} operation 
 * @param {number} id record in booking table, 0 for operation insert
 * check if the request create a overbooking
 */
function checkOverBooking(booking, res, operation, id) {
    // (StartA <= EndB) and (EndA >= StartB)

    const dbConn = db.openDB()
    dbConn.connect()
    const query = "select * from booking where start <= '" + booking.end + "' and end >= '" + booking.start + "'";
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) {
            console.log(operation + ' failed')
            res.status(400).json({ status: 'KO', message: operation + ' failed' })
            return
        }
        if (results.length === 0) {
            if (operation === 'insert') {
                insertBooking(booking, res)
            } else {
                updateBooking(id, booking, res)
            }
            return
        } else {
            console.log(operation + ' failed - overbooking')
            res.status(400).json({ status: 'KO', message: operation + ' failed - overbooking' })
        }
    })

}

/**
 * 
 * @param {string} time
 * @returns string
 * chenge the date format to mysql format 
 * apparently Date does not have a method for creating YYYY/MM/DD HH:MM:SS
 */
function cleanTime(time) {
    let tmp = new Date(time)
    return tmp.getFullYear().toString() + '/' + zeroFill(1 + tmp.getMonth()) + '/' + zeroFill(tmp.getDate()) + ' ' + zeroFill(tmp.getHours()) + ':' + zeroFill(tmp.getMinutes()) + ':' + zeroFill(tmp.getSeconds())
}

/**
 * 
 * @param {number} a 
 * @returns string
 * convert to string adding a zero if length == 1
 */
function zeroFill(a) {
    let sa = a.toString
    if (sa.length === 1) {
        return '0' + sa
    }
    return sa
}

