const db = require('../db/mysql')

function queryCategories(container) {
  return function(req, res, next) {
    db.queryCategories(function(data) {
      container.cates = data
      container.cates.show = 4
      next()
    })
  }
}

function queryBooks(container) {
  return function(req, res, next) {
    db.queryBooks(function(data) {
      container.books = data
      next()
    })
  }
}

function signin() {
  return function(req, res, next) {
    if (req.body.sign === 'in') {
      db.checkUser([req.body.username, req.body.password], function(pass, data){
        if (pass) {
          res.cookie('username', req.body.username)
          res.redirect(data[0].identity === '1' ? '/admin' : '/')
        } else {
          res.redirect('/sign')
        }
      })
    }
    next()
  }
}

function signup() {
  return function(req, res) {
    if (req.body.sign == 'up') {
      const user = [
        req.body.username,
        req.body.password,
        req.body.way,
        req.body.addr,
      ]
      db.insertUser(user, function(pass){
        if (pass) res.redirect('/sign')
      })
    }
  }
}


function queryBookInfo(container) {
  return function(req, res, next) {
    db.queryBookInfo([req.query.book], function(data) {
      if (data.length) Object.assign(container, data[0])
      next()
    })
  }
}

function querySup(container) {
  return function(req, res, next) {
    db.querySup([container.sup_id], function(data) {
      if (data.length) container.sup = data[0].name
      next()
    })
  }
}

function addOrder() {
  return function(req, res) {
    const order = {
      b_id: req.body.book_id,
      b_quan: req.body.buy_quan,
      cus_id: req.body.username,
    }

    db.addOrder(order, function(pass) {
      if (pass) res.redirect('/custom')
    })
  }
}

function queryAdminInfo(container) {
  return function(req, res, next) {
    db.queryAdminInfo([req.cookies.username], function(data) {
      if (data.length) container.user = data[0]
      else res.redirect('/sign')
      next()
    })
  }
}

function queryOrders(container) {
  return function(req, res, next) {
    db.queryOrders(function(data) {
      container.orders = data
      next()
    })
  }
}

function queryDelis(container) {
  return function(req, res, next) {
    db.queryDelis(function(data) {
      container.delis = data
      next()
    })
  }
}

function queryUserInfo(container) {
  return function(req, res, next) {
    db.queryUserInfo([req.cookies.username], function(data) {
      if (data.length) container.user = data[0]
      else res.redirect('/sign')
      next()
    })
  }
}

function queryOrderById(container) {
  return function(req, res, next) {
    db.queryOrderById([req.cookies.username], function(data) {
      container.orders = data
      next()
    })
  }
}

function queryDeliById(container) {
  return function(req, res, next) {
    db.queryDeliById([req.cookies.username], function(data) {
      container.deli = data
      next()
    })
  }
}

module.exports = {
  queryCategories,
  queryBooks,
  signin,
  signup,
  queryBookInfo,
  querySup,
  addOrder,
  queryAdminInfo,
  queryOrders,
  queryDelis,
  queryUserInfo,
  queryOrderById,
  queryDeliById,
}
