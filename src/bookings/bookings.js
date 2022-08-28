import * as db from "../database/database.js"


/**
 *
 * @param {object} booking
 * @param {express.Response} res
 */
export function insertBooking(booking, res) {
    // TODO controllare date e sovrapposizioni con altre prenotazioni
    const dbConn = db.openDB()
    dbConn.connect()
    const query = "insert into booking(customer_id,start,end) values(" + booking.customerId + ",'" + booking.start + "','" + booking.end + "')"
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) throw error
        console.log('Created booking with id ' + results.insertId)
        if (results.affectedRows === 0) {
            res.status(400).json({
                status: 'KO',
                message: 'Booking not created'
            })
        } else {
            res.json({
                status: 'OK',
                message: 'Booking created',
                bookingId: results.insertId
            })
        }
    })
}

/**
 *
 * @param {int} bookigId
 * @param {object} booking
 * @param {express.Response} res
 */
export function updateBooking(bookingId, booking, res) {
    // TODO controllare sovrapposizioni e date
    const dbConn = db.openDB()
    dbConn.connect()
    const query = "update booking set customer_id = " + booking.customerId + ", start = '" + booking.start + "',end='" + booking.end + "' where book_id = " + bookingId
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) throw error
        console.log('Affected rows ' + results.affectedRows)
        if (results.affectedRows === 0) {
            res.status(400).json({
                status: 'KO',
                message: 'Booking not updated'
            })
        } else {
            res.json({
                status: 'OK',
                message: 'Booking updated'
            })
        }
    })
}

/**
 *
 * @param {int} bookingId
 * @param {express.Response} res
 */
export function deleteBooking(bookingId, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = 'delete from booking where book_id = ' + bookingId
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) throw error
        console.log('Deleted booking with id ' + bookingId)
        if (results.affectedRows === 0) {
            res.status(404).json({
                status: 'OK',
                message: 'Booking not found'
            })
        } else {
            res.json({
                status: 'OK',
                message: 'Booking deleted'
            })
        }
    })
}

/**
 *
 * @param {int} bookingId
 * @param {express.Response} res
 */
export function getBooking(bookingId, res) {
    const dbConn = db.openDB()
    dbConn.connect()
    const query = 'select * from booking where book_id = ' + bookingId
    console.log(query)
    dbConn.query(query, function (error, results) {
        dbConn.end()
        if (error) throw error
        console.log('Read booking with id ' + bookingId)
        if (results.length === 1) {
            res.json(results[0])
        } else {
            res.status(404).json({})
        }
    })
}