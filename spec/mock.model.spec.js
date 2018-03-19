var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var mockModel = require('./mock/mock.model');
var initData = {
  'Emp': [
    { "ID": "1",  "Code": "LiuYi",    "Name": "刘一" },
    { "ID": "2",  "Code": "ChenEr",   "Name": "陈二" },
    { "ID": "3",  "Code": "ZhangSan", "Name": "张三" },
    { "ID": "4",  "Code": "LiSi",     "Name": "李四"},
    { "ID": "5",  "Code": "WangWu",   "Name": "王五"},
    { "ID": "6",  "Code": "ZhaoLiu",  "Name": "赵六"},
    { "ID": "7",  "Code": "SunQi",    "Name": "孙七"},
    { "ID": "8",  "Code": "ZhouBa",   "Name": "周八"},
    { "ID": "9",  "Code": "WuJiu",    "Name": "吴九"},
    { "ID": "10", "Code": "ZhengShi", "Name": "郑十" }
  ],

  'Edu': [
    { "ID": "11", "EmpID": "1", "SchoolName": "山东师范大学", "Major": "计算机", "BeginDate": "2005-09-01", "EndDate": "2009-06-30" },
    { "ID": "12", "EmpID": "1", "SchoolName": "山东大学",    "Major": "计算机", "BeginDate": "2009-09-01", "EndDate": "2012-06-30" },
    { "ID": "21", "EmpID": "2", "SchoolName": "青岛大学",    "Major": "计算机", "BeginDate": "2005-09-01", "EndDate": "2009-06-30" },
    { "ID": "22", "EmpID": "2", "SchoolName": "中国海洋大学", "Major": "计算机", "BeginDate": "2009-09-01", "EndDate": "2012-06-30" }
  ],

  'Job': [
    { "ID": "11", "EmpID": "1", "CompanyName": "浪潮国际", "BeginDate": "2012-09-01", "EndDate": "2018-02-28" },
    { "ID": "21", "EmpID": "2", "CompanyName": "浪潮软件", "BeginDate": "2012-09-01", "EndDate": "2018-02-28" },
    { "ID": "31", "EmpID": "3", "CompanyName": "浪潮信息", "BeginDate": "2012-09-01", "EndDate": "2018-02-28" },
    { "ID": "41", "EmpID": "4", "CompanyName": "浪潮云服务", "BeginDate": "2012-09-01", "EndDate": "2018-02-28"}
  ]
};


describe("【Suite: MockModel测试】", function () {


  beforeEach(function() {

    // 初始化数据
    mockModel.saveAllDataToFile(initData);

  });


  it("【Spce1st: 验证表配置】", function () {
    var tableConfigs = mockModel.tableConfigs
    expect(tableConfigs.length).toBe(3);
    expect(tableConfigs[0]['tableName']).toBe('Emp');
    expect(tableConfigs[1]['tableName']).toBe('Edu');
    expect(tableConfigs[2]['tableName']).toBe('Job');
  });


  it("【Spce2nd: 验证JSON文件路径", function () {
    expect(mockModel.fileDir, './data/mock-model');

    var expectedPath = path.resolve(__dirname, './data/mock-model/Emp.json');
    expect(mockModel.getFilePath('Emp')).toBe(expectedPath);
  });


  it("【Spce3rd: 验证getTableDataFromFile返回结果是否正确", function () {
    
    var empTableData = mockModel.getTableDataFromFile('Emp');
    expect(empTableData.length).toBe(10);
    expect(empTableData[0]['Code']).toBe('LiuYi');
    expect(empTableData[9]['Code']).toBe('ZhengShi');
  });


  it("【Spce4th: 验证getAllDataFromFile返回结果是否正确", function () {
    var allData = mockModel.getAllDataFromFile();
    var empTableData    = allData['Emp'];
    var eduTableData    = allData['Edu'];
    var jobTableData    = allData['Job'];

    expect(empTableData.length).toBe(10);
    expect(eduTableData.length).toBe(4);
    expect(jobTableData.length).toBe(4);
  });


  it("【Spce5th: 验证saveTableDataToFile是否正常", function () {
    var tableName = 'Emp';
    var tableData = [
      {ID: '1',   Code: 'Emp0001'},
      {ID: '10',  Code: 'Emp0010'},
      {ID: '100', Code: 'Emp0100'},
      {ID: '2',   Code: 'Emp0002'},
      {ID: '20',  Code: 'Emp0020'},
      {ID: '3',   Code: 'Emp0003'}
    ];

    // 保存后的顺序应该是1 2 3 10 20 100
    mockModel.saveTableDataToFile(tableName, tableData);

    var empTableData = mockModel.getTableDataFromFile(tableName);
    var firstEmp = _.first(empTableData);
    var lastEmp  = _.last(empTableData);

    expect(empTableData.length).toBe(6);
    expect(firstEmp['ID']).toBe('1');
    expect(lastEmp['ID']).toBe('100');
  });


  it("【Spce5th: 验证saveTableDataToFile是否正常", function () {
    var data = {
      'Emp':  [
        {ID: '1',   Code: 'Emp0001'},
        {ID: '10',  Code: 'Emp0010'},
        {ID: '100', Code: 'Emp0100'},
        {ID: '2',   Code: 'Emp0002'},
        {ID: '20',  Code: 'Emp0020'},
        {ID: '3',   Code: 'Emp0003'}
      ],

      'Edu':  [
        {ID: '1',   Code: 'Edu0001'},
        {ID: '10',  Code: 'Edu0010'},
        {ID: '100', Code: 'Edu0100'},
        {ID: '2',   Code: 'Edu0002'},
        {ID: '20',  Code: 'Edu0020'},
        {ID: '3',   Code: 'Edu0003'}
      ],

      'Job':  [
        {ID: '1',   Code: 'Job0001'},
        {ID: '10',  Code: 'Job0010'},
        {ID: '100', Code: 'Job0100'},
        {ID: '2',   Code: 'Job0002'},
        {ID: '20',  Code: 'Job0020'},
        {ID: '3',   Code: 'Job0003'}
      ]
    };
    mockModel.saveAllDataToFile(data);

    // 验证Emp表数据
    var empTableData = mockModel.getTableDataFromFile('Emp');
    var firstEmp = _.first(empTableData);
    var lastEmp  = _.last(empTableData);
    expect(empTableData.length).toBe(6);
    expect(firstEmp['ID']).toBe('1');
    expect(lastEmp['ID']).toBe('100');

    // 验证Edu表数据
    var eduTableData = mockModel.getTableDataFromFile('Edu');
    var firstEdu = _.first(eduTableData);
    var lastEdu  = _.last(eduTableData);
    expect(eduTableData.length).toBe(6);
    expect(firstEdu['ID']).toBe('1');
    expect(lastEdu['ID']).toBe('100');

    // 验证Job表数据
    var jobTableData = mockModel.getTableDataFromFile('Job');
    var firstJob = _.first(jobTableData);
    var lastJob  = _.last(jobTableData);
    expect(jobTableData.length).toBe(6);
    expect(firstJob['ID']).toBe('1');
    expect(lastJob['ID']).toBe('100');

  });

  it("【Spce6st: 验证getList方法", function () {
    var data = mockModel.getList();
    var empTableData    = data['Emp'];
    var eduTableData    = data['Edu'];
    var jobTableData    = data['Job'];

    expect(empTableData.length).toBe(10);
    expect(eduTableData.length).toBe(0);
    expect(jobTableData.length).toBe(0);
  });


});