var Model = require('./model');

function DeptModel(options) {

  // 调用父构造函数
  Model.call(this, options);
}

// 原型构造
DeptModel.prototype = Object.create(
  Model.prototype,
  {
    constructor: { configurable: true, enumerable: true, value: DeptModel, writable: true}
  }
);

/**
 * 模型配置
 */
var options = {
  
  // 相对于 /models/model.js，待优化
  fileDir: '../data/dept-model/',
  tableConfigs: [
    { tableName: 'Dept',    parentTable: '',    primaryKey: 'ID', foreignKey: '', columnNames: ['ID', 'Code',  'Name'] }
  ]
};

var deptModel = new DeptModel(options);
module.exports  =deptModel;

