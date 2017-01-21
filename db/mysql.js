var mysql = require('mysql');

// mysql connect
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookcase'
});

var sql = {
  qyCategories: 'select id, name from category',
  qyBooks: 'select id, name, price, author, descript, cate_id, image from book',
  qyBookById: 'select * from book where id=?',
  qySup: 'select name from supplier where id=?',
  qyUser: 'select identity from bc_user where id=? and pwd=?',
  insertUser: 'insert into bc_user(id,pwd,identity) values(?,?,?)',
  updateCustomer: 'update customer set name=?,contact=?,addr=? where id=?'
};


connection.connect();

function directBack(callback) {
  return function(err, rows) {
    if (err) throw err;
    callback(rows);
  };
}

exports.queryCategories = function (callback) {
  connection.query(
    sql.qyCategories,
    directBack(callback)
  );
};

exports.queryBooks = function (callback) {
  connection.query(
    sql.qyBooks,
    directBack(callback)
  );
};

exports.checkUser = function (user, callback) {
  connection.query(
    sql.qyUser,
    user,
    function(err, rows) {
      if (err) throw err;
      callback(rows.length, rows);
    }
  );
};

exports.insertUser = function (user, callback) {
  var insert = [
    user[0],
    user[1],
    '0'
  ];
  connection.query(
    sql.insertUser,
    insert,
    function(err, rows) {
      if (err) {
        callback(false);
      }
      updateCustomer(user, callback);
    }
  );
};

exports.queryBookInfo = function (book_id, callback) {
  connection.query(
    sql.qyBookById,
    book_id,
    directBack(callback)
  );
};

exports.querySup = function (sup_id, callback) {
  connection.query(
    sql.qySup,
    sup_id,
    directBack(callback)
  );
};

function updateCustomer(user, callback) {
  var update = [
    user[0],
    user[2],
    user[3],
    user[0]
  ];
  connection.query(
    sql.updateCustomer,
    update,
    function(err, rows) {
      if (err) throw err;
      callback(true);
    }
  );
}
