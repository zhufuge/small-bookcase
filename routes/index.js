var express = require('express');
var router = express.Router();
var db = require('../db/mysql');

var indexPageData = {};
var bookPageData = {};
var customPageData = {};
var adminPageData = {};

router
  .use('/', queryCategories())
  .use('/', queryBooks())
  .get('/', function(req, res, next) {
    indexPageData.username = req.cookies.username;
    res.render('index', indexPageData);
  });

router
  .get('/sign', function(req, res, next) {
    var oldUsername = req.cookies.username;
    res.clearCookie('username');
    res.render('sign', {username: oldUsername});
  })
  .post('/sign', sign_in())
  .post('/sign', sign_up());

router
  .use('/book', queryBookInfo())
  .use('/book', querySup())
  .get('/book', function(req, res, next) {
    bookPageData.username = req.cookies.username;
    res.render('book', bookPageData);
  })
  .post('/book', addOrder());

router
  .use('/admin', queryAdminInfo())
  .use('/admin', queryOrders())
  .use('/admin', queryDelis())
  .get('/admin', function(req, res, next) {
    adminPageData.username = req.cookies.username;
    res.render('admin', adminPageData);
  });

router
  .use('/custom', queryUserInfo())
  .use('/custom', queryOrderById())
  .use('/custom', queryDeliById())
  .get('/custom', function(req, res, next) {
    customPageData.username = req.cookies.username;
    res.render('custom', customPageData);
  });


function queryCategories() {
  return function(req, res, next) {
    db.queryCategories(function(data) {
      indexPageData.cates = data;
      indexPageData.cates.show = 4;
      next();
    });
  };
}

function queryBooks() {
  return function(req, res, next) {
    db.queryBooks(function(data) {
      indexPageData.books = data;
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
          res.cookie('username', req.body.username);
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
        bookPageData = data[0];
      }
      next();
    });
  };
}

function querySup() {
  return function(req, res, next) {
    db.querySup([bookPageData.sup_id], function(data) {
      if (data.length) {
        bookPageData.sup = data[0].name;
      }
      next();
    });
  };
}

function addOrder() {
  return function(req, res, next) {
    var order = {
      b_id: req.body.book_id,
      b_quan: req.body.buy_quan,
      cus_id: req.body.username
    };

    db.addOrder(order, function(pass) {
      if (pass) {
        res.redirect('/custom');
      }
    });
  };
}

function queryUserInfo() {
  return function(req, res, next) {
    db.queryUserInfo([req.cookies.username], function(data) {
      if (data.length) {
        customPageData.user = data[0];
      } else {
        res.redirect('/sign');
      }
      next();
    });
  };
}

function queryOrderById() {
  return function(req, res, next) {
    db.queryOrderById([req.cookies.username], function(data) {
      customPageData.orders = data;
      next();
    });
  };
}

function queryDeliById() {
  return function(req, res, next) {
    db.queryDeliById([req.cookies.username], function(data) {
      customPageData.deli = data;
      next();
    });
  };
}

function queryAdminInfo() {
  return function(req, res, next) {
    db.queryAdminInfo([req.cookies.username], function(data) {
      if (data.length) {
        adminPageData.user = data[0];
      } else {
        res.redirect('/sign');
      }
      next();
    });
  };
}

function queryOrders() {
  return function(req, res, next) {
    db.queryOrders(function(data) {
      adminPageData.orders = data;
      next();
    });
  };
}

function queryDelis() {
  return function(req, res, next) {
    db.queryDelis(function(data) {
      adminPageData.delis = data;
      next();
    });
  };
}

module.exports = router;
