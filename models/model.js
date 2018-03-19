var fs = require('fs');
var path = require('path');
var _ = require('lodash');

/**
 * 构造函数
 */
function Model(options) {
  this.fileDir      = options.fileDir;
  this.tableConfigs = options.tableConfigs
}

/**
 * 原型定义
 */
Model.prototype = {

  /**
   * 切换构造函数
   */
  constructor: Model,


  // --------------------------------------------------------------------------------
  // CRUD封装
  // --------------------------------------------------------------------------------

  /**
   * 获取列表(只获取主表数据)
   */
  getList: function() {
    var self, result, parentTableName;
    self = this;
    result = {};
    parentTableName = this.getParentTableName();

    // 遍历所有表，获取主表数据，子表设置为空集合
    _.each(this.tableConfigs, function(tableConfig) {
      var tableName = tableConfig['tableName'];
      if (tableName === parentTableName) {
        result[tableName] = self.getTableDataFromFile(tableName);
      } else {
        result[tableName] = [];
      }
    });
    return result;
  },


  // --------------------------------------------------------------------------------
  // JSON文件操作
  // --------------------------------------------------------------------------------

  /**
   * 获取tableName的表配置
   */
  getTableConfig: function(tableName) {
    var tableConfig = _.find(this.tableConfigs, {tableName: tableName});
    return tableConfig;
  },

  /**
   * 获取主表表配置
   */
  getParentTableConfig: function() {
    var tableConfig = _.find(this.tableConfigs, {parentTable: ''});
    return tableConfig;
  },

  /**
   * 获取主表表名
   */
  getParentTableName: function() {
    var tableConfig = this.getParentTableConfig();
    return tableConfig['tableName'];
  },


  // --------------------------------------------------------------------------------
  // JSON文件操作
  // --------------------------------------------------------------------------------

  /**
   * 获取表对应的JSON文件
   */
  getFilePath: function(tableName) {

    // 检测模型数据目录是否存在，不存在则创建
    var dirPath = path.resolve(__dirname, this.fileDir);
    if (fs.exists(dirPath)) {
      fs.mkdir(dirPath);
    }

    // 组装json文件完整路径
    var fileName = tableName + '.json';
    var fullPath = dirPath + '/' + fileName;
    return fullPath;
  },

  /**
   * 从JSON文件中获取员工列表
   */
  getTableDataFromFile: function(tableName) {
    var path, json, tableData;
    path = this.getFilePath(tableName);
    json = fs.readFileSync(path);
    tableData = JSON.parse(json);

    return tableData;
  },

  /**
   * 从JSON文件中获取全部数据
   */
  getAllDataFromFile: function() {
    var self, result;
    self = this;
    result = {};

    _.each(this.tableConfigs, function(tableConfig) {
      var tableName = tableConfig.tableName;
      result[tableName] = self.getTableDataFromFile(tableName);
    });

    return result;
  },

  /**
   * 将员工列表写入到JSON文件中
   */
  saveTableDataToFile: function(tableName, tableData) {
    var path, json;
    tableData = _.orderBy(
      tableData,
      function(item) {
        return parseInt(item.ID);
      },
      'asc'
    );
    path = this.getFilePath(tableName);
    json = JSON.stringify(tableData);
    fs.writeFileSync(path, json);
  },

  /**
   * 将数据设置到相关JSON文件中
   */
  saveAllDataToFile: function(data) {
    var self, result;
    self = this;
    result = {};

    _.each(this.tableConfigs, function(tableConfig) {
      var tableName, tableData;
      tableName = tableConfig.tableName;
      tableData = data[tableName] ? data[tableName] : [];
      self.saveTableDataToFile(tableName, tableData);
    });

    return result;
  }
}

module.exports = Model;
