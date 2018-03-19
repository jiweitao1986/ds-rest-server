var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();


/**
 * 跨域设置
 */
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  next();
});


/**
 * 处理静态托管
 */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * 处理body
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/**
 * 路由处理
 */
var index = require('./routes/index');
app.use('/',      index);

var emps = require('./routes/emps');
app.use('/emps',  emps);

var depts = require('./routes/depts');
app.use('/depts', depts);


app.listen(8080);