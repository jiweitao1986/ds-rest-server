var Model = require('../../models/model');

function MockModel(options) {

  // 调用父构造函数
  Model.call(this, options);
}

// 原型构造
MockModel.prototype = Object.create(Model.prototype,
  {
    constructor: { configurable: true, enumerable: true, value: MockModel, writable: true}
  }
);


/**
 * 模型配置
 */
var options = {
  
  // 相对于 /models/model.js，待优化
  fileDir: '../spec/data/mock-model/',
  tableConfigs: [
    { tableName: 'Emp',    parentTable: '',    primaryKey: 'ID', foreignKey: ''},
    { tableName: 'Edu',    parentTable: 'Emp', primaryKey: 'ID', foreignKey: 'EmpID'},
    { tableName: 'Job',    parentTable: 'Emp', primaryKey: 'ID', foreignKey: 'EmpID'},
  ]
};

var mockModel = new MockModel(options);


module.exports = mockModel;