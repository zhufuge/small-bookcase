var express = require('express');
var router = express.Router();
var db = require('../db/mysql');

var cateAndBooks = {
  cates: {},
  books: {}
};

var bookInfo = {};

router
  .use('/', queryCategories())
  .use('/', queryBooks())
  .get('/', function(req, res, next) {
    res.render('index', cateAndBooks);
  });

router
  .get('/sign', function(req, res, next) {
    res.render('sign');
  })
  .post('/sign', sign_in())
  .post('/sign', sign_up());

router
  .use('/book', queryBookInfo())
  .use('/book', querySup())
  .get('/book', function(req, res, next) {
    res.render('book', bookInfo);
  });

router.get('/admin', function(req, res, next) {
  res.render('admin', {username: req.body.username});
});

router.get('/custom', function(req, res, next) {
  res.render('custom');
});


function queryCategories() {
  return function(req, res, next) {
    db.queryCategories(function(data) {
      var cates = {
        show: 4,
        id: [],
        name: []
      };

      for (var i in data) {
        cates.id.push(data[i].id);
        cates.name.push(data[i].name);
      }
      cateAndBooks.cates = cates;

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

      cateAndBooks.books = books;
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
      db.checkUser(user, function(pass, data){
        if (pass) {
          if (data[0].identity == '1') {
            res.redirect('/admin');
          } else {
            res.redirect('/');
          }
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

function queryBookInfo() {
  return function(req, res, next) {
    db.queryBookInfo([req.query.book], function(data) {
      if (data.length) {
        bookInfo = data[0];
      }
      next();
    });
  };
}

function querySup() {
  return function(req, res, next) {
    db.querySup([bookInfo.sup_id], function(data) {
      if (data.length) {
        bookInfo.sup = data[0].name;
      }
      next();
    });
  };
}



module.exports = router;
