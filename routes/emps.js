var express = require('express');
var router = express.Router();
var empModel = require('../models/emp.model');

/**
 * 获取员工列表
 */
router.get('/', function(req, res) {
  var result = empModel.getList();
  res.json(result);
});


/**
 * 获取员工详情
 */
router.get('/:id', function(req, res) {
  var id = req.params.id;
  var result = empModel.getInfo(id);
  res.json(result);
});


/**
 * 新增员工
 */
router.post('/', function(req, res) {
});


/**
 * 编辑员工
 */
router.put('/', function(req, res) {
});


// 删除员工
router.delete('/:id', function(req, res) {
});


module.exports = router;


