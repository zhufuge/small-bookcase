const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const router = require('./routes/index')

const app = express()

// 渲染引擎设置
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 小图标设置
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// 日志设置
app.use(logger('dev'))
// 数据体解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// 静态文件传输
app.use(express.static(path.join(__dirname, 'public')))

// 路由设置
app.use('/', router)

// 404 并抛出错误
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// 错误处理
app.use(function(err, req, res) {
  // 服务器错误记录
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 生成错误页面
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
