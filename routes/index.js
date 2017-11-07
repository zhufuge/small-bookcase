const express = require('express')
const router = express.Router()

// 单一全局存储变量
const GLOBAL = {
  INDEX: {},
  BOOK: {},
  CUSTOM: {},
  ADMIN: {},
}

// 处理函数
const {
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
} = require('./handler')

// 响应
router
  .use('/', queryCategories(GLOBAL.INDEX))
  .use('/', queryBooks(GLOBAL.INDEX))
  .get('/', function(req, res) {
    GLOBAL.INDEX.username = req.cookies.username
    res.render('index', GLOBAL.INDEX)
  })

router
  .get('/sign', function(req, res) {
    const { username } = req.cookies
    res.clearCookie('username')
    res.render('sign', { username })
  })
  .post('/sign', signin())
  .post('/sign', signup())

router
  .use('/book', queryBookInfo(GLOBAL.BOOK))
  .use('/book', querySup(GLOBAL.BOOK))
  .get('/book', function(req, res) {
    GLOBAL.BOOK.username = req.cookies.username
    res.render('book', GLOBAL.BOOK)
  })
  .post('/book', addOrder())

router
  .use('/admin', queryAdminInfo(GLOBAL.ADMIN))
  .use('/admin', queryOrders(GLOBAL.ADMIN))
  .use('/admin', queryDelis(GLOBAL.ADMIN))
  .get('/admin', function(req, res) {
    GLOBAL.ADMIN.username = req.cookies.username
    res.render('admin', GLOBAL.ADMIN)
  })

router
  .use('/custom', queryUserInfo(GLOBAL.CUSTOM))
  .use('/custom', queryOrderById(GLOBAL.CUSTOM))
  .use('/custom', queryDeliById(GLOBAL.CUSTOM))
  .get('/custom', function(req, res) {
    GLOBAL.CUSTOM.username = req.cookies.username
    res.render('custom', GLOBAL.CUSTOM)
  })

module.exports = router
