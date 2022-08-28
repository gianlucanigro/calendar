import mysql from 'mysql'


/**
 *
 * @returns {mysql.Connection}
 */

 export function openDB () {
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'pippo123',
      database: 'calendar'
    })
    return connection
  }
  