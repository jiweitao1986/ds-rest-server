var util = {

  /**
   * 包装模型数据，讲表数据包装成{ data, pagination }的形式
   * @param modelData 
   */
  wrapData: function(modelData) {
    var result = {};
    Object.keys(modelData).forEach( function(tableName) {
      result[tableName] = {
        data: modelData[tableName],
      };
    });
    return result;
  }

}


module.exports = util;

