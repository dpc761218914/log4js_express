# log4js_express
express项目中集成log4j日志模块和officegen模块

# log4js模块
### 一、log4j模块配置
##### 1.1 安装log4j模块
```
npm install log4js –save
```
##### 1.2 在项目中config文件夹中新建log4j json配置文件
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
##### 1.3 在项目根目录新建logger文件，引入log4j暴露给用户使用
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
##### 1.4 项目中使用log4j

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

# officegen模块
### 一、officegen模块配置
##### 1.1、officegen模块安装
```
//安装officegen模块可能比较慢，用户访问某个链接后可以下载文件。
npm install officegen –save 
```
##### 1.2、officegen引入
```
//引入各个模块，fs模块支持文件处理，docx实例化文档，path进行文件路径处理
var officegen = require('officegen');
var fs = require('fs');
var docx = officegen ( 'docx' );
var path = require('path');
```
##### 1.3、officegen使用
```
//可以通过officegen设置字体大小、颜色、位置等。
app.get('/doc', function(req,res){
        logger.info('用户进入doc!测试日志等级info');
        docx.on ( 'finalize', function ( written ) {
            console.log ( 'Finish to create Word file.\nTotal bytes created: ' + written + '\n' );
        });
        docx.on ( 'error', function ( err ) {
            console.log ( err );
        });
        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '南昌市一中数据模拟考一', { bold: true,font_face: 'Arial', font_size: 18 });// 添加文字 设置字体样式 加粗 大小
        var pObj = docx.createP ();
        pObj.addText ( '考试时间120分钟  满分150分' );
        var pObj = docx.createP ();
        pObj.addText ( '第Ⅰ卷');
        var pObj = docx.createP ();
        pObj.addText ( '一、选择题（单选，每小题5分，共60分）', { color: '000088'} );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' ,{ bold: true, underline: true } );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.options.align = 'right';
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addLineBreak ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );  var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( '这里进行officegen测试');
        var pObj = docx.createP ();
        pObj.addText ( '给officegen添加阴影部分' ,{ highlight: 'darkGreen' });
        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '设置字体样式和大小，给段落居中', { bold: true,font_face: 'Arial', font_size: 18 });// 添加文字 设置字体样式 加粗 大小
        var pObj = docx.createP ();
        //在doc文档中插入图片
        pObj.addImage ( path.resolve(__dirname, 'images/image3.png' ) );
        console.log("路径："+__dirname);
        var pObj = docx.createP ();
        //这里在段落中插入图片
        pObj.addImage ( path.resolve(__dirname, 'images/sword_001.png' ) );
        pObj.addImage ( path.resolve(__dirname, 'images/sword_002.png' ) );
        pObj.addImage ( path.resolve(__dirname, 'images/sword_003.png' ) );
        pObj.addText ( '... some text here ...', { font_face: 'Arial' } );
        pObj.addImage ( path.resolve(__dirname, 'images/sword_004.png' ) );
        var pObj = docx.createP ();
        pObj.addImage ( path.resolve(__dirname, 'images/image1.png' ) );
        docx.putPageBreak ();
        var pObj = docx.createListOfNumbers ();
        pObj.addText ( 'Option 1' );
        var pObj = docx.createListOfNumbers ();
        pObj.addText ( 'Option 2' );
        pObj.addHorizontalLine ();
        
        //给文档中插入表格
        var table = [
            [{
                val: "No.",
                opts: {
                    cellColWidth: 4261,
                    b:true,
                    sz: '48',
                    shd: {
                        fill: "7F7F7F",
                        themeFill: "text1",
                        "themeFillTint": "80"
                    },
                    fontFamily: "Avenir Book"
                }
            },{
                val: "Title1",
                opts: {
                    b:true,
                    color: "A00000",
                    align: "right",
                    shd: {
                        fill: "92CDDC",
                        themeFill: "text1",
                        "themeFillTint": "80"
                    }
                }
            },{
                val: "Title2",
                opts: {
                    align: "center",
                    cellColWidth: 42,
                    b:true,
                    sz: '48',
                    shd: {
                        fill: "92CDDC",
                        themeFill: "text1",
                        "themeFillTint": "80"
                    }
                }
            }],
            [1,'这里插入表格',''],
            [2,'这里插入表格.',''],
            [3,'But when it is a matter of baobabs, that always means a catastrophe.',''],
            [4,'watch out for the baobabs!','END'],
        ]
        var tableStyle = {
            tableColWidth: 4261,
            tableSize: 24,
            tableColor: "ada",
            tableAlign: "left",
            tableFontFamily: "Comic Sans MS"
        }
        var pObj = docx.createTable (table, tableStyle);
        var out = fs.createWriteStream ( 'out.docx' );// 文件写入
        out.on ( 'error', function ( err ) {
            console.log ( err );
        });
        var result = docx.generate (out);// 服务端生成word
        res.writeHead ( 200, {
      // 注意这里的type设置，导出不同文件type值不同application/vnd.openxmlformats-officedocument.presentationml.presentation
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            'Content-disposition': 'attachment; filename=out.docx'
        });
        docx.generate (res);// 客户端导出word
        logger.error('返回数据成功doc,测试日志等级error');
    });
```

# mock模块
### 一、mock模块配置
##### 1.1、mock模块安装
```
//安装mock模块
npm install mock -save
```
##### 1.2、页面引用
```
//在需要使用的页面引用
var Mock = require('mockjs');
```
##### 1.3、页面导入 
    * 随机数进行配置时间等
    * 可以生成测试图片，图片可以设置大小、颜色、文字等
    * 可以返回boolean、object、array等

```
//使用代码
app.get('/mock', function(req,res){
        //声明一个随机生成函数
        var Random = Mock.Random;
        res.json(Mock.mock({
            "fixed":"这是固定好的数字",
            "string|3": "★★★",
            "image":Random.image('900x200', '#50B347', '#FFF', 'Mock.js'),  //模拟发送图片，可以控制普片颜色，图片大小，文字
            "data":Random.date('yyyy-MM-dd'),    //模拟时间  可以发送各种格式时间
            "text":'@paragraph',                  //模拟发送段落， 可以控制长度
            "sentence":Mock.mock('@sentence(5)'),   //模拟发送五个词的句子
            "word":Mock.mock('@word'),              //模拟发送单词
            "title":Mock.mock('@title(5)'),   //模拟发送标题
            "cParagraph":Mock.mock('@cparagraph(8)'), //模拟发送中文段落
            "cSentence": Mock.mock('@csentence()'),           //模拟发送中文句子
            "cWord":Mock.mock('@cword("零一二三四五六七八九十")'),   //模拟一个中文词语
            "cTitle": Mock.mock('@ctitle(5)'),     //模拟中文标题
            "cName": Mock.mock('@cname'),          //模拟用户姓名，可以单独模拟姓、也可以模拟名
            "cEmail":Mock.mock('@email'),         //模拟邮箱
            "cAddress":Mock.mock('@county(true)'),   //模拟地址
            "number":Mock.mock('@increment(100)'),    //模拟比一百大的数组
            "sectionNumber|1-100": 100,                //模拟1到100的随机数
            "boolean|1": true,                       //模拟boolean类型数据
            "objects|2":  {                          //模拟返回两个对象数组
                "310000": "上海市",
                "320000": "江苏省",
                "330000": "浙江省",
                "340000": "安徽省"
            },
            "array|1": [                              //模拟返回数组类型数据，从数组中取出随机数
                "AMD",
                "CMD",
                "UMD"
            ]

        }));
        }
    );
```

# lodash模块
### 一、lodash模块配置
##### 1.1、lodash模块安装
```
lodash是Node.js工具类模块，具体用法在使用过程中才考API
```

# bluebird模块（比原生Promise更加高效）
##### 一、bluebird模块安装
```
npm install bluebird -save
```

##### 一、bluebird Promise初体验
```
//三个Promise按照顺序执行，读取txt中的内容
  //promise使用，让异步执行更加简单,按照顺序读取文件内容
     app.get('/promise', function(req,res){
         var test1 = function(cfg){
             return new Promise(function(resolve, reject){
                 fs.readFile(cfg, "utf-8", function(err, data){
                     if(err){
                         reject(err);
                     } else {
                       //  console.log("test1: ".concat(data));
                         resolve(data.trim());
                     }
                 });
             });
         };
 
         var test2 = function(cfg){
             return new Promise(function(resolve, reject){
                 fs.readFile(cfg, "utf-8", function(err, data){
                     if(err){
                         reject(err);
                     } else {
                       //  console.log("test2: ".concat(data));
                         resolve(data.trim());
                     }
                 });
             });
         };
 
         var test3 = function(cfg){
             return new Promise(function(resolve, reject){
                 fs.readFile(cfg, "utf-8", function(err, data){
                     if(err){
                         reject(err);
                     } else {
                         //console.log("test3: ".concat(data));
                         resolve(data.trim());
                     }
                 });
             });
         };
 
         test1(txt1)
             .then(function(data){
                 console.log("test1"+data);
                 return test2(txt2)
             })
             .then(function(data){
                 console.log("test2"+data);
                 return test3(txt3)
             })
             .then(function(data){
                 console.log("test3"+data);
                 res.send("success");
             })
             .catch(function(err){
                 console.log(err.message);
             });
     });

    
```
##### 二、bluebird Promise all方法，以及函数的抽取
```
    //将异步promise精简成一个函数，这里试用promiseall方法，异步读取项目根目录下三个文件操作。处理三个异步相互无关的操作
    app.get('/promise_all', function(req,res){
        function createPromise(cfg){
            return new Promise(function(resolve, reject){
                fs.readFile(cfg, "utf-8", function(err, data){
                    if(err){
                        reject(err);
                    } else {
                        console.log("test1: ".concat(data));
                        resolve(data.trim());
                    }
                });
            });
        }

        Promise.all([createPromise(txt1),createPromise(txt2),createPromise(txt3)]).then(function(data){
            console.log("执行成功,结果如下：");
            let [data1,data2,data3]=data;
            console.log(data1);
            console.log(data2);
            console.log(data3);
            res.send("success");
        },function(){
            console.log("至少一个执行失败")
        });
    });

```
##### 二、bluebird 异步执行的方法之间相互关联，上一个函数返回的结果是下一个函数的参数
```

    //promise异步处理是有相互影响的操作，前面执行的方法是后面函数 执行的参数
    app.get('/promise_parm', function(req,res){
        // 读取数据1
        function readTxt1(cfg){
            return new Promise(function(resolve,reject){
                fs.readFile(cfg, "utf-8", function(err, data){
                    if(err){
                        reject(err);
                    } else {
                        console.log("test1: ".concat(data));
                        resolve(data.trim());
                    }
                });
            });
        }

        //读取数据2
        function readTxt2(cfg){
            return new Promise(function(resolve,reject){
                fs.readFile(cfg, "utf-8", function(err, data){
                    if(err){
                        reject(err);
                    } else {
                        console.log("test2: ".concat(data));
                        resolve(data.trim());
                    }
                });
            });
        }

        //读取数据3
        function readTxt3(cfg){
            return new Promise(function(resolve,reject){
                fs.readFile(cfg, "utf-8", function(err, data){
                    if(err){
                        reject(err);
                    } else {
                        // console.log("test2: ".concat(data));
                        resolve(data.trim());
                    }
                });
            });
        }


        //promist 异步处理,第一个promise的结果，是第二个promise处理请求函数的参数
        readTxt1("txt1.txt")
            .then(function(data){
                //console.log(data);
                return readTxt2(data)
            })
            .then(function(data2){
                return readTxt3(data2)
            })
            .then(function(data3){
                console.log("jieguo:"+data3);
                res.send("test");
            })
    });
```
# multer模块（文件上传、图片单图上传、多张图片上传），通过此模块，用户可以上传图片到服务器（可指定文件夹，和更改文件名）成功后，将文件名保存到数据库中，

##### 一、multer、fs、path模块安装
```
npm install multer fs path -save
```

#####二、使用配置
```
//引入相关依赖
var path = require('path');
var multer = require('multer');
var fs = require('fs');
//创建文件夹工具方法
var createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};
//自定义新建文件夹路径
var uploadFolder = 'public/uploads/user';
createFolder(uploadFolder);

//配置上传路径和上传文件名
// file upload destination folder
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder);
  },
  // file upload extension
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// file upload variable
var upload = multer({
  storage: storage
});

```

#####三、使用
```
//其中req.body是获取用户表单数据
// 上传单个文件
app.post('/api_single', upload.single('photo'), function(req, res, next) {
console.log('文件名=='+req.file.filename);
var profile = new Profile({
  title: req.body.title,
  description: req.body.description,
  photo: req.file.filename,
});
console.log(req.file);
console.log(req.body);
profile.save(function(err, data) {
  if (err) {
    return next(err);
  }
  console.log(data);
  res.redirect('/');
});
});

//上传多个文件
app.post('/api', upload.array('photo',2), function(req, res, next) {
console.log('文件名=='+req.files[0].filename);
var profile = new Profile({
  title: req.body.title,
  description: req.body.description,
  photo: req.files[0].filename,
});
console.log(req.file);
console.log(req.body);
profile.save(function(err, data) {
  if (err) {
    return next(err);
  }
  console.log(data);
  res.redirect('/');

});

});
  
 //前端表单
 
<div class="container">
<div class="row justify-content-center">
 <div class="col col-md-6">
   <form method="post" enctype="multipart/form-data" action="/api">
     <div class="form-group">
       <label for="title">Title</label>
       <input type="text" class="form-control" name="title" placeholder="Enter title" required>
     </div>
     <div class="form-group">
       <label for="title">Description</label>
       <input type="text" class="form-control" name="description" placeholder="Enter description">
     </div>
     <div class="form-group">
       <label for="photo">Photo</label>
       <input type="file" class="form-control-file" name="photo">
         <input type="file" class="form-control-file" name="photo">
     </div>
     <button type="submit" class="btn btn-outline-info">Submit</button>
   </form>
 </div>
</div>
</div>

```