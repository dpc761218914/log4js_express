/**
 * 功能：ioredis 集成测试
 * 作者： dpc
 * 日期： 2018/5/27.
 */
var express = require('express');
var app = express();

// 引入log4j,并且加载配置文件
var log4js = require('log4js');
log4js.configure('./config/log4j.json');

// key相关路由
require('./routers/index')(app);


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});