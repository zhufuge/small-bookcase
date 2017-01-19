var express = require('express');
var router = express.Router();
var db = require('../db/mysql');

// render Data
var renderData = {
  cates: {},
  books: {}
};

// index router
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

router.get('/admin', function(req, res, next) {
  res.render('admin');
});

router.get('/custom', function(req, res, next) {
  res.render('custom');
})

// sign post
router
  .post('/sign', sign_in())
  .post('/sign', sign_up());

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

function sign_in() {
  return function(req, res, next) {
    if (req.body.sign == 'in') {
      var user = [
        req.body.username,
        req.body.password
      ];
      db.checkUser(user, function(pass){
        if (pass) {
          res.redirect('/');
        } else {
          res.redirect('/sign');
        }
      });
    }
    next();
  };
}

function sign_up() {
  return function(req, res, next) {
    if (req.body.sign == 'up') {
      var user = [
        req.body.username,
        req.body.password,
        req.body.way,
        req.body.addr
      ];
      db.insertUser(user, function(pass){
        if (pass) {
          res.redirect('/sign');
        }
      });
    }
  };
}


module.exports = router;
