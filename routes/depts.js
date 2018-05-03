var express = require('express');
var router = express.Router();
var model = require('../models/dept.model');
var util = require('../utils/util');

/**
 * 获取部门列表
 */
router.get('/', function(req, res) {
  var modelData = model.getList();
  var result = util.wrapData(modelData);
  res.json(result);
});

/**
 * 创建新部门
 */
router.get('/new', function(req, res) {
  var modelData = model.createNewInfo();
  var result = modelData['dept'][0];
  res.json(result);
});


/**
 * 获取部门详情
 */
router.get('/:id', function(req, res) {
  var id = req.params.id;
  var modelData = model.getInfo(id);
  var result = util.wrapData(modelData);
  res.json(result);
});

/**
 * 提交部门
 */
router.post('/', function(req, res) {

  var result, data;
  
  // 新增操作
  data = req.body;
  model.saveInfo(data);
  
  // 返回结果
  result = {
    code: 'ok',
    message: '新增成功'
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
  model.saveInfo(data);
  
  // 返回结果
  result = {
    code: 'ok',
    message: '编辑成功'
  };
  res.json(result);

});

/**
 * 删除部门
 */
router.delete('/:id', function(req, res) {
  var id, data;

  // 删除数据
  id = req.params.id;
  model.delInfo(id);

  // 返回结果
  result = {
    code: 'ok',
    message: '删除成功'
  };
  res.json(result);

});

module.exports = router;


