meanjs-leancloud
=====
meanjs-leancloud

##安装依赖
* [Bower](http://bower.io/):

```bash
$ npm install -g bower
```


* [Grunt](http://gruntjs.com/):

```bash
$ npm install -g grunt-cli
```



* [yeoman](http://yeoman.io/):

```bash
$ npm install -g yo
```



* [leancloud 命令行工具](https://leancloud.cn/docs/cloud_code_commandline.html):

```bash
$ npm install -g avoscloud-code
```
##开始
* 安装依赖包：

```bash
$ npm install
```

* 添加 app keys:
在项目根目录下创建文件： .avoscloud/keys.json ,内容格式如下

```json
{"LC_APP_ID":"[App ID]","LC_APP_KEY":"[App Key]","LC_APP_MASTER_KEY":"[Master Key]"}
```


* 运行：

```bash
$ grunt
```

* [部署](https://leancloud.cn/docs/cloud_code_commandline.html#部署):
需要先[添加应用](https://leancloud.cn/docs/cloud_code_commandline.html#添加应用),git部署需要[添加代码库](https://leancloud.cn/docs/leanengine_guide-node.html#部署).


##其它
* meanjs: [官网](http://meanjs.org/);[项目地址](https://github.com/meanjs/mean)
