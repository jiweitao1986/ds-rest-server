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

  /**
   * 获取员工信息
   */
  getInfo: function(id) {
    var allData;
    allData = this.getAllDataFromFile();
    return this.getDataByID(allData, id);
  },

  /**
   * 新增带默认值的数据
   */
  createNewInfo() {
    var self, result, parentId;
    self = this;
    result = {};
    parentId = '' + _.random(1000, 9999);

    _.each(this.tableConfigs, function(tableConfig) {
      var tableName, columnNames, primaryKey, foreignKey, newRow;

      tableName   = tableConfig['tableName'];
      columnNames = tableConfig['columnNames'];
      primaryKey  = tableConfig['primaryKey'];
      foreignKey  = tableConfig['foreignKey'];

      // 创建空的新行
      var newRow = {};
      _.each(columnNames, function(columnName) {
          newRow[columnName] = '';
      });

      // 更新主键、外键
      if (tableConfig.parentTable === '') {
        newRow[primaryKey] = parentId;
      } else {
        newRow[primaryKey] = _.random(1000, 9999);
        newRow[foreignKey] = parentId;
      }

      result[tableName] = [newRow];
    });

    return result;
  },


  /**
   * 保存数据单条数据
   */
  saveInfo: function(data) {
    var id, allData, newAllData, isExist;
    allData = this.getAllDataFromFile();

    //获取主表记录的ID
    id = this.getParentTableID(data);
    isExist = this.isExist(allData, id);

    //如果已经存在，先删除相关数据
    if (isExist) {
      allData = this.delDataByID(allData, id);
    }

    //追加数据
    newAllData = this.appendData(allData, data);
    this.saveAllDataToFile(newAllData);
  },


  /**
   * 批量保存
   */
  saveList: function(data) {
    console.log('暂不实现');
  },

  /**
   * 删除
   */
  del: function(id) {
    var allData, newAllData;
    allData = this.getAllDataFromFile();
    newAllData = this.delDataByID(id);
    this.saveAllDataToFile(newAllData);
  },

  /**
   * 批量删除
   */
  multiDel: function(ids) {
    var self = this;
    _.each(ids, function(id) {
      self.del(id);
    });
  },


  // --------------------------------------------------------------------------------
  // 数据加工
  // --------------------------------------------------------------------------------

  /**
   * 从data中获取主表记录的ID
   */
  getParentTableID: function(data) {
    var tableConfig, tableName, primaryKey, tableData, firstRow, id;

    tableConfig = this.getParentTableConfig();
    tableName = tableConfig['tableName'];
    primaryKey = tableConfig['primaryKey'];

    tableData = data[tableName];
    firstRow = tableData[0];
    id = firstRow[primaryKey];

    return id;
  },

  /**
   * 根据给定的主表id，获取data中检索相关数据
   */
  getDataByID: function(data, id) {
    var self, result;
    self = this;
    result = {};

    _.each(this.tableConfigs, function(tableConfig) {
      var tableName, tableData, filter;

      tableName  = tableConfig['tableName'];
      tableData  = data[tableName];

      result[tableName] = _.filter(tableData, function(rowData) {
        if (tableConfig.parentTable === '') {
          return rowData[tableConfig.primaryKey] === id;
        } else {
          return rowData[tableConfig.foreignKey] === id;
        }
      });

    });

    return result;
  },

  /**
   * 根据给定的主表id，从给定data中移除相关数据
   */
  delDataByID: function(data, id) {
    var self, result;
    self = this;
    result = {};

    _.each(this.tableConfigs, function(tableConfig) {
      var tableName, tableData, filter;

      tableName  = tableConfig['tableName'];
      tableData = data[tableName];

      result[tableName] = _.filter(tableData, function(rowData) {
        if (tableConfig.parentTable === '') {
          return rowData[tableConfig.primaryKey] !== id;
        } else {
          return rowData[tableConfig.foreignKey] !== id;
        }
      });

    });

    return result;
  },

  /**
   * 合并数据
   */
  appendData: function(data, dataToAppend) {
    var result = {}

    _.each(dataToAppend, function(tableDataToAppend, tableNameToAppend) {
      var tableData = data[tableNameToAppend];
      if (tableData instanceof Array) {
        result[tableNameToAppend] = tableData.concat(tableDataToAppend);
      }
    });

    return result;
  },

  /**
   * 判断data的主表中是否存在值为id的行
   */
  isExist: function(data, id) {
    var tableConfig, tableName, primaryKey, tableData, isExist;

    // 获取主表数据
    tableConfig = this.getParentTableConfig();
    tableName = tableConfig['tableName'];
    primaryKey = tableConfig['primaryKey'];
    tableData = data[tableName];
    
    // 判断行是否存在
    isExist = _.some(tableData, ['ID', id]);

    return isExist;
  },


  // --------------------------------------------------------------------------------
  // 模型配置处理
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
    if (fs.existsSync(dirPath) === false) {
      fs.mkdirSync(dirPath);
    }

    // 组装json文件完整路径,日字旁；如果文件不存在，则创建一个空数据的文件。
    var fileName = tableName + '.json';
    var fullPath = dirPath + '/' + fileName;
    if (fs.existsSync(fullPath) === false) {
      fs.writeFileSync(fullPath, '[]');
    }

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
