const mysql = require('mysql')
const fs = require('fs')
const path = require('path')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookcase'
})
connection.connect()

const sql = JSON.parse(fs.readFileSync(path.join(__dirname, 'sql.json'), 'utf8'))

function directBack(callback) {
  return function(err, rows) {
    if (err) throw err
    callback(rows)
  }
}

function queryCategories(callback) {
  connection.query(
    sql.qyCategories,
    directBack(callback)
  )
}

function queryBooks(callback) {
  connection.query(
    sql.qyBooks,
    directBack(callback)
  )
}

function checkUser(user, callback) {
  connection.query(
    sql.qyUser,
    user,
    function(err, rows) {
      if (err) throw err
      callback(rows.length, rows)
    }
  )
}

function insertUser(user, callback) {
  connection.query(
    sql.insertUser,
    [user[0], user[1], '0'],
    function(err) {
      if (err) callback(false)
      updateCustomer(user, callback)
    }
  )
}

function queryBookInfo(book_id, callback) {
  connection.query(
    sql.qyBookById,
    book_id,
    directBack(callback)
  )
}

function querySup(sup_id, callback) {
  connection.query(
    sql.qySup,
    sup_id,
    directBack(callback)
  )
}

function addOrder(order, callback) {
  connection.query(
    sql.addOrder,
    [createOrderId(), order.b_id, order.b_quan, order.cus_id],
    function(err) {
      if (err) throw err
      callback(true)
    }
  )
}

function queryUserInfo(id, callback) {
  connection.query(
    sql.qyCustom,
    id,
    directBack(callback)
  )
}

function queryOrderById(id, callback) {
  connection.query(
    sql.qyOrderById,
    id,
    directBack(callback)
  )
}

function queryDeliById(id, callback) {
  connection.query(
    sql.qyDeliById,
    id,
    directBack(callback)
  )
}

function queryAdminInfo(id, callback) {
  connection.query(
    sql.qyAdmin,
    id,
    directBack(callback)
  )
}

function queryOrders(callback) {
  connection.query(
    sql.qyOrders,
    directBack(callback)
  )
}

function queryDelis(callback) {
  connection.query(
    sql.qyDelis,
    directBack(callback)
  )
}

function updateCustomer(user, callback) {
  connection.query(
    sql.updateCustomer,
    [user[0], user[2], user[3], user[0]],
    function(err) {
      if (err) throw err
      callback(true)
    }
  )
}

function createOrderId() {
  const date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours()

  return '' + Math.floor(Math.random() * 100) +
    ((month < 10) ? '0' : '') + month +
    ((day < 10) ? '0' : '') + day +
    ((hours < 10) ? '0' : '') + hours
}

module.exports = {
  queryCategories,
  queryBooks,
  checkUser,
  insertUser,
  queryBookInfo,
  querySup,
  addOrder,
  queryUserInfo,
  queryOrderById,
  queryDeliById,
  queryAdminInfo,
  queryOrders,
  queryDelis,
}
