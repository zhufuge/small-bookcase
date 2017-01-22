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
  updateCustomer: 'update customer set name=?,contact=?,addr=? where id=?',
  addOrder: 'insert into order_form(id, b_id, b_quan, cus_id) values(?,?,?,?)',
  qyCustom: 'select * from customer where id=?',
  qyOrderById: 'select o.id,b.name book_name,o.b_quan,o.o_time ' +
    'from order_form as o,book as b where o.b_id=b.id and o.cus_id=?',
  qyDeliById: 'select d.id,d.o_id,d.o_time,b.name book_name,' +
    'd.b_quan,d.admin_id,d.d_time ' +
    'from deliver as d, book as b where d.b_id=b.id and d.cus_id=?',
  qyAdmin: 'select * from admin where id=?',
  qyOrders: 'select o.id,b.name book_name,o.b_quan,o.o_time,' +
    'c.id cus_id,c.contact,c.addr from order_form as o,book as b,' +
    'customer as c where o.b_id=b.id and o.cus_id=c.id',
  qyDelis: 'select d.id, d.o_id, d.o_time, b.name book_name,' +
    'd.b_quan, d.admin_id, d.d_time, c.id cus_id, c.contact,' +
    'c.addr from deliver as d, book as b, customer as c ' +
    'where d.b_id = b.id and d.cus_id = c.id'
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

exports.addOrder = function(order, callback) {
  var insert = [
    createOrderId(),
    order.b_id,
    order.b_quan,
    order.cus_id
  ];
  connection.query(
    sql.addOrder,
    insert,
    function(err, rows) {
      if (err) throw err;
      callback(true);
    }
  );
};

exports.queryUserInfo = function(id, callback) {
  connection.query(
    sql.qyCustom,
    id,
    directBack(callback)
  );
};

exports.queryOrderById = function(id, callback) {
  connection.query(
    sql.qyOrderById,
    id,
    directBack(callback)
  );
};

exports.queryDeliById = function(id, callback) {
  connection.query(
    sql.qyDeliById,
    id,
    directBack(callback)
  );
};

exports.queryAdminInfo = function(id, callback) {
  connection.query(
    sql.qyAdmin,
    id,
    directBack(callback)
  );
};

exports.queryOrders = function(callback) {
  connection.query(
    sql.qyOrders,
    directBack(callback)
  );
};

exports.queryDelis = function(callback) {
  connection.query(
    sql.qyDelis,
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

function createOrderId() {
  var orderStr = '';
  orderStr += Math.floor(Math.random() * 100);

  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  orderStr += ((month < 10) ? '0' : '') + month;
  orderStr += ((day < 10) ? '0' : '') + day;
  orderStr += ((hours < 10) ? '0' : '') + hours;

  return orderStr;
}
