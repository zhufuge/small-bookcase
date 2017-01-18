var mysql = require('mysql');

// mysql connect
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookcase'
});

var sql = {
  qyCategory: 'select id, name from category',
  qyBooks: 'select id, name, price, author, descript, cate_id, image from book'
};


connection.connect();

function directBack(callback) {
  return function(err, rows) {
    if (err) throw err;
    callback(rows);
  };
}

// query book category info
exports.queryCategory = function (callback) {
  connection.query(
    sql.qyCategory,
    directBack(callback)
  );
};

// query book info
exports.queryBooks = function (callback) {
  connection.query(
    sql.qyBooks,
    directBack(callback)
  );
};
