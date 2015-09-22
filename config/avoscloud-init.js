'use strict';

var AV = require('leanengine');
var chalk = require('chalk');
var fs = require('fs');

// 兼容Promise/A+
AV.Promise.setPromisesAPlusCompliant(true);

var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;
var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

if (!(APP_ID && APP_KEY && MASTER_KEY)) {
  var appKeys = getAppKeys();
  APP_ID = appKeys.LC_APP_ID;
  APP_KEY = appKeys.LC_APP_KEY;
  MASTER_KEY = appKeys.LC_APP_MASTER_KEY;
}

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

function getAppKeys() {
  var keysPath = './../.avoscloud/keys' + (process.env.NODE_ENV === 'test' ? '-test' : '') + '.json';
  try {
    return require(keysPath);
  } catch (e) {
    try {
      fs.mkdirSync('.avoscloud');
    } catch (e) {}

    var appKeysSample = {
      LC_APP_ID: '[App ID]',
      LC_APP_KEY: '[App Key]',
      LC_APP_MASTER_KEY: '[Master Key]'
    };

    fs.writeFileSync('.avoscloud/keys.sample.json', JSON.stringify(appKeysSample));

    console.error(chalk.red('找不到leancloude相关的key。请到项目后台【设置-应用Key】将相应的key写入【' + keysPath + '】,参考【.avoscloud/keys.sample.json】。'));
    throw e;
  }
}
