var simpleModel = require('../models/simple.model');

describe("简单测试套件", function () {
  var a;

  it("a的值是true", function () {
    a = true;
    expect(a).toBe(true);
  });

  it("模型名称为simple", function () {
    expect(simpleModel.name).toBe('simple');
  });

});