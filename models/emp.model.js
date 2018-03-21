var Model = require('./model');

function EmpModel(options) {

  // 调用父构造函数
  Model.call(this, options);
}

// 原型构造
EmpModel.prototype = Object.create(
  Model.prototype,
  {
    constructor: { configurable: true, enumerable: true, value: EmpModel, writable: true}
  }
);

/**
 * 模型配置
 */
var options = {
  
  // 相对于 /models/model.js，应该相对于根目录
  fileDir: '../data/emp-model/',
  tableConfigs: [
    { tableName: 'Emp',    parentTable: '',    primaryKey: 'ID', foreignKey: '',      columnNames: ['ID', 'Code',  'Name'] },
    { tableName: 'Edu',    parentTable: 'Emp', primaryKey: 'ID', foreignKey: 'EmpID', columnNames: ['ID', 'EmpID', 'SchoolName',  'BeginDate',  'EndDate'] },
    { tableName: 'Job',    parentTable: 'Emp', primaryKey: 'ID', foreignKey: 'EmpID', columnNames: ['ID', 'EmpID', 'CompanyName', 'BeginDate', 'EndDate'] }
  ]
};

var empModel = new EmpModel(options);
module.exports = empModel;
