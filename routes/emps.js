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
 * 创建待默认值的新数据
 */
router.get('/new', function(req, res) {
  var id = req.params.id;
  var result = empModel.createNewInfo(id);
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
  var result, data;
  
  // 新增操作
  data = req.body;
  empModel.saveInfo(data);
  
  // 返回结果
  result = {
    code: 'ok',
    message: '保存成功'
  };
  res.json(result);

});


/**
 * 编辑员工
 */
router.put('/', function(req, res) {
  var result, data;
  
  // 新增操作
  data = req.body;
  empModel.saveInfo(data);
  
  // 返回结果
  result = {
    code: 'ok',
    message: '保存成功'
  };
  res.json(result);
});


// 删除员工
router.delete('/:id', function(req, res) {
  var id, data;

  // 删除数据
  id = req.params.id;
  empModel.delInfo(id);

  // 返回结果
  result = {
    code: 'ok',
    message: '保存成功'
  };
  res.json(result);
});


module.exports = router;


