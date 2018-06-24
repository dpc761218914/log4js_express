# log4js_express
express项目中集成log4j日志模块和officegen模块

# log4js模块
### 一、log4j模块配置
#####1.1 安装log4j模块
#####1.2 在项目中config文件夹中新建log4j json配置文件
```
{
  "appenders": {
    "console": {
      "type": "console"
    },
    "trace": {
      "type": "file",
      "filename": "log/access.log",
      "maxLogSize ": 31457280
    },
    "http": {
      "type": "logLevelFilter",
      "appender": "trace",
      "level": "trace",
      "maxLevel": "trace"
    },
    "info": {
      "type": "dateFile",
      "filename": "log/app-info.log",
      "pattern": ".yyyy-MM-dd",
      "layout": {
        "type": "pattern",
        "pattern": "[%d{ISO8601}][%5p  %z  %c] %m"
      },
      "compress": true
    },
    "maxInfo": {
      "type": "logLevelFilter",
      "appender": "info",
      "level": "debug",
      "maxLevel": "info"
    },
    "error": {
      "type": "dateFile",
      "filename": "log/app-error.log",
      "pattern": ".yyyy-MM-dd",
      "layout": {
        "type": "pattern",
        "pattern": "[%d{ISO8601}][%5p  %z  %c] %m"
      },
      "compress": true
    },
    "minError": {
      "type": "logLevelFilter",
      "appender": "error",
      "level": "error"
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "console",
        "http",
        "maxInfo",
        "minError"
      ],
      "level": "all"
    }
  }
}

```
#####1.3 在项目根目录新建logger文件，引入log4j暴露给用户使用
```
/**
 * 功能： log4j日志管理
 * 作者： dpc
 * 日期： 2018/6/6.
 */


var log4js = require('log4js');

log4js.configure({
    appenders: [{
        type: 'console' // 控制台输出
    }, {
        type: 'dateFile', // 文件输出
        filename:  __dirname + './logs/access', // 需要手动创建此文件夹
        pattern: "yyyy-MM-dd.log",
        alwaysIncludePattern: true,
        maxLogSize: 1024,
        backups: 4, // 日志备份数量，大于该数则自动删除
        category: 'logInfo' // 记录器名
    }],
    replaceConsole: true // 替换 console.log
});

levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
};

exports.logger = function (name, level) {
    var logger = log4js.getLogger(name);
    logger.setLevel(levels[level] || levels['debug']);
    return logger;
};

// 配合 express 使用的方法
exports.use = function (app, level) {
    app.use(log4js.connectLogger(log4js.getLogger('logInfo'), {
        level: levels[level] || levels['debug'],
        format: ':method :url :status'
    }));
};

```
#####1.4 项目中使用log4j

```
//在需要使用的文件中引入配置
var logger = require('log4js').getLogger("index");
//在项目中使用log4j
app.get('/index', function(req,res){
        logger.info('用户进入主页!测试日志等级info');
        console.log("console log");
        res.send("index");
        logger.error('返回数据成功,测试日志等级error');
    });
```