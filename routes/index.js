var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// mysql connect
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookcase'
});

connection.connect();

// query book category info
function queryCategory(callback) {
  connection.query(
    'select id, name from category',
    function(err, rows) {
      if (err) throw err;
      callback(rows);
    }
  );
}

// query book info
function queryBooks(callback) {
  connection.query(
    'select id, name, price, author, descript, cate_id, image from book',
    function(err, rows) {
      if (err) throw err;
      callback(rows);
    }
  );
}

// render Data
var renderData = {
  cates: {},
  books: {}
};

router.use('/', function(req, res, next) {
  queryCategory(function(data) {
    var cates = {
      show: 4,
      id: [],
      name: []
    };

    for (var i in data) {
      cates.id.push(data[i].id);
      cates.name.push(data[i].name);
    }
    renderData.cates = cates;

    next();
  });
});

router.use('/', function(req, res, next) {
  queryBooks(function(data) {
    var books = {
      id: [],
      name : [],
      price : [],
      author : [],
      cate : [],
      descript : [],
      image: []
    };

    for (var i in data) {
      books.id.push(data[i].id);
      books.name.push(data[i].name);
      books.price.push(data[i].price);
      books.author.push(data[i].author);
      books.cate.push(data[i].cate_id);
      books.descript.push(data[i].descript);
      books.image.push(data[i].image);
    }

    renderData.books = books;
    next();
  });
});

router.use('/', function(req, res, next) {
  console.log(renderData.cates.id);
  if (renderData.cates) {
    res.render('index', renderData);
  }
});

module.exports = router;
