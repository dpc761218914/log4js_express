
/**
 * 功能：index
 * 作者： dpc
 * 日期： 2018/5/9.
 */

var logger = require('log4js').getLogger("index");

var officegen = require('officegen');
var fs = require('fs');
var docx = officegen ( 'docx' );
var path = require('path');


module.exports = function(app) {
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
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
        var pObj = docx.createP ();
        pObj.addText ( '1. 设集合A＝｛3,5,6,8}，集合B＝｛4,5,7,8}，则A∩B等于(　　) ' );
        var pObj = docx.createP ();
        pObj.addText ( 'A．｛3,4,5,6,7,8}　　　　　 B．｛3,6}          C．｛4,7}           D．｛5,8}' );
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


    app.get('/index', function(req,res){
        logger.info('用户进入主页!测试日志等级info');
        console.log("console log");
        res.send("index");
        logger.error('返回数据成功,测试日志等级error');
    });
};

