var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var empModel = {

  /**
   * 文件目录
   */
  fileDir: '../data/',

  /**
   * 表配置
   */
  tableConfigs: [
    { tableName: 'Emp',    parentTable: '',    primaryKey: 'ID', foreignKey: ''},
    { tableName: 'Edu',    parentTable: 'Emp', primaryKey: 'ID', foreignKey: 'EmpID'},
    { tableName: 'Job',    parentTable: 'Emp', primaryKey: 'ID', foreignKey: 'EmpID'},
    { tableName: 'Income', parentTable: 'Emp', primaryKey: 'ID', foreignKey: 'EmpID'},
  ],

  // /**
  //  * 获取列表(只获取主表数据)
  //  */
  // getList: function() {
  //   var self, result, parentTableName;
  //   self = this;
  //   result = {};
  //   parentTableName = this.getParentTableName();

  //   _.each(this.tableConfigs, function(tableConfig) {
  //     var tableName = tableConfig['tableName'];
  //     if (tableName === parentTableName) {
  //       result[tableName] = self.getTableDataFromFile(tableName);
  //     } else {
  //       result[tableName] = [];
  //     }
  //   });
  //   return result;
  // },

  // /**
  //  * 获取员工信息
  //  */
  // getInfo: function(id) {
  //   var allData;
  //   allData = this.getAllDataFromFile();
  //   return this.getDataByID(allData, id);
  // },

  // /**
  //  * 删除
  //  */
  // del: function(id) {
  //   var allData, newAllData;
  //   allData = this.getAllDataFromFile();
  //   newAllData = this.delDataByID(id);
  //   this.saveAllDataToFile(newAllData);
  // },

  // /**
  //  * 批量删除
  //  */
  // multiDel: function(ids) {
  //   var self = this;
  //   _.each(ids, function(id) {
  //     self.del(id);
  //   });
  // },

  // /**
  //  * 新增
  //  */
  // save: function(data) {
  //   var id, allData, newAllData, isExist;
  //   allData = this.getAllDataFromFile();

  //   //获取主表记录的ID
  //   id = this.getParentTableID(data);
  //   isExist = this.isExist(allData);

  //   //如果已经存在，先删除相关数据
  //   if (isEXist) {
  //     allData = this.delDataByID(allData, id);
  //   }

  //   //追加数据
  //   newAllData = this.appendData(allData, data);
  //   this.saveAllDataToFile(allData);
  // },

  // /**
  //  * 批量保存
  //  */
  // multiSave: function(data) {
  //   console.log('暂不实现');
  // },


  // // ----------------------------------------
  // // 表配置处理工具方法
  // // ----------------------------------------

  // /**
  //  * 获取tableName的表配置
  //  */
  // getTableConfig: function(tableName) {
  //   var tableConfig = _.find(self.tableConfigs, {tableName: tableName});
  //   return tableConfig;
  // },

  // /**
  //  * 获取主表表配置
  //  */
  // getParentTableConfig: function() {
  //   var tableConfig = _.find(self.tableConfigs, {parentTable: ''});
  //   return tableConfig;
  // },

  // /**
  //  * 获取主表表名
  //  */
  // getParentTableName: function() {
  //   var tableConfig = this.getParentTableConfig();
  //   return tableConfig[tableName];
  // },


  // // ----------------------------------------
  // // data处理工具方法
  // // ----------------------------------------

  // /**
  //  * 从data中获取主表记录的ID
  //  */
  // getParentTableID: function(data) {
  //   var tableConfig, tableName, primaryKey, tableData, firstRow, id;

  //   tableConfig = this.getParentTableConfig();
  //   tableName = tableConfig['tableName'];
  //   primaryKey = tableConfig['primaryKey'];

  //   tableData = data[tableName];
  //   firstRow = tableData[0];
  //   id = firstRow[primaryKey];

  //   return id;
  // },

  // /**
  //  * 根据给定的主表id，获取data中检索相关数据
  //  */
  // getDataByID: function(data, id) {
  //   var self, result;
  //   self = this;
  //   result = {};

  //   _.each(this.tableConfigs, function(tableConfig) {
  //     var tableName, tableData, filter;

  //     tableName  = tableConfig['tableName'];
  //     tableData  = data[tableName];

  //     result[tableName] = _.filter(tableData, function(rowData) {
  //       if (tableConfig.parentTable === '') {
  //         return rowData[tableConfig.primaryKey] === id;
  //       } else {
  //         return rowData[tableConfig.foreignKey] === id;
  //       }
  //     });

  //   });

  //   return result;
  // },

  // /**
  //  * 根据给定的主表id，从给定data中移除相关数据
  //  */
  // delDataByID: function(data, id) {
  //   var self, result;
  //   self = this;
  //   result = {};

  //   _.each(this.tableConfigs, function(tableConfig) {
  //     var tableName, tableData, filter;

  //     tableName  = tableConfig['tableName'];
  //     tableData = data[tableName];

  //     result[tableName] = _.filter(tableData, function(rowData) {
  //       if (tableConfig.parentTable === '') {
  //         return rowData[tableConfig.primaryKey] !== id;
  //       } else {
  //         return rowData[tableConfig.foreignKey] !== id;
  //       }
  //     });

  //   });

  //   return result;
  // },

  // /**
  //  * 合并数据
  //  */
  // appendData: function(data, dataToAppend) {
  //   var result = {}

  //   _.each(dataToAppend, function(tableDataToAppend, tableNameToAppend) {
  //     var tableData = data[tableNameToAppend];
  //     if (tableData instanceof Array) {
  //       result[tableNameToAppend] = tableData.contact(tableDataToAppend);
  //     }
  //   });

  //   return result;
  // },

  // /**
  //  * 判断data的主表中是否存在值为id的行
  //  */
  // isExist: function(data, id) {
  //   var tableConfig, tableName, primaryKey, tableData, isExist;

  //   // 获取主表数据
  //   tableConfig = this.getParentTableConfig;
  //   tableName = tableConfig['tableName'];
  //   primaryKey = tableConfig['primaryKey'];
  //   tableData = data[tableName];
    
  //   // 判断行是否存在
  //   isExist = _.some(tableData, function(rowData) {
  //     rowData[primaryKey] = id;
  //   });

  //   return isExist;
  // },


  // // ----------------------------------------
  // // JSON文件操作
  // // ----------------------------------------

  /**
   * 获取表对应的JSON文件
   */
  getFilePath: function(tableName) {
    var fileName = tableName + '.json';
    return path.resolve(__dirname, this.fileDir + fileName);
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

    _.each(this.tableConfigs, function(tableConfigs) {
      var tableName, tableData;
      tableName = table.tableName;
      tableData = data[tableName] ? data[tableName] : [];
      self.saveTableData(tableName, tableData);
    });

    return result;
  }

}

module.exports = empModel;