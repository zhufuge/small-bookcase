var express = require('express');
var router = express.Router();
var db = require('../db/mysql');

// render Data
var renderData = {
  cates: {},
  books: {}
};

function queryCategory() {
  return function(req, res, next) {
    db.queryCategory(function(data) {
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
  };
}

function queryBooks() {
  return function(req, res, next) {
    db.queryBooks(function(data) {
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
  };
}

router
  .use('/', queryCategory())
  .use('/', queryBooks())
  .get('/', function(req, res, next) {
    res.render('index', renderData);
  });

router.get('/sign', function(req, res, next) {
  res.render('sign');
});

router.get('/book', function(req, res, next) {
  res.render('book');
});

router
  .post('/sign', function(req, res, next) {
    if (req.body.sign == 'in') {
      var user = {
        username: 'admin',
        password: '123456'
      };

      if (req.body.username === user.username &&
          req.body.password === user.password) {
        res.redirect('/');
      }
      res.redirect('/sign');
    }
  });

module.exports = router;
