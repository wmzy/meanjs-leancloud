'use strict';

before(function () {
  // 环境变量 NODE_ENV 不是 test 是件很危险的事情
  'test'.should.equal(process.env.NODE_ENV);
});
