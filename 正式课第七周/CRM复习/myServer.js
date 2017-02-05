var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->统一处理客户端资源文件的请求
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {
        var conFile = null,
            status = null;
        try {
            conFile = fs.readFileSync('.' + pathname);
            status = 200;
        } catch (e) {
            conFile = 'not found!';
            status = 404;
        }
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }

        res.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8;'});
        res.end(conFile);
        return;
    }

    /*
     * API接口功能的实现
     * 1、真实项目中我们需要使用数据库来存储我们的数据(mongodb、access、my sql、sql server、oracle...)，我们今天把数据先临时存储在JSON/CUSTOM.JSON文件中
     * 2、获取这个文件中所有的客户信息以及定义统一的返回数据格式的模板
     *
     */
    var result = {code: 1, msg: 'ERROR', data: null},
        dataPath = './json/custom.json',
        customData = fs.readFileSync(dataPath, 'utf-8');//->[string]
    customData = JSON.parse(customData);//->JSON OBJECT

    //->获取全部的客户信息
    if (pathname === '/getAllList') {
        result = {
            code: 0,
            msg: 'SUCCESS',
            data: customData
        };
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    //->获取指定的客户信息
    //1)获取客户端传递进来的客户ID (QUERY)
    //2)在所有的客户信息中通过传递进来的ID,找到具体的某一个客户的详细信息
    //3)把找到的信息返回给客户端
    if (pathname === '/getInfo') {
        var curId = query.id;
        for (var i = 0; i < customData.length; i++) {
            var cur = customData[i];
            if (curId == cur.id) {
                result = {
                    code: 0,
                    msg: 'SUCCESS',
                    data: cur
                };
                break;
            }
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    //->删除指定客户信息
    //1)获取客户端通过问号传递参数方式传递进来的客户ID
    //2)循环所有的客户信息,在数组中把和当前传递ID相同的那一项删除掉
    //3)把最新的数据重新写入到文件中（文件中也是最新数据了）
    //4)返回删除的结果给客户端
    if (pathname === '/removeInfo') {
        curId = query['id'];
        customData.forEach(function (item, index) {
            if (curId == item['id']) {
                customData.splice(index, 1);
                fs.writeFileSync(dataPath, JSON.stringify(customData), 'utf-8');//->写入的内容需要是字符串格式的
                result = {
                    code: 0,
                    msg: 'SUCCESS'
                };
            }
        });
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    //->增加客户信息
    //1)接收客户端通过请求主体传递给服务器的内容(一般比较大,使用QUERY已经获取不到结果了)=>
    // req.on('data',function...) 正在接收客户端传递的内容
    // req.on('end',function...) 客户端请求主体传递的内容接收完成
    if (pathname === '/addInfo') {
        var passData = '';
        req.on('data', function (chunk) {
            passData += chunk;
        });
        req.on('end', function () {
            //->把我们传递过来的内容放到数组中
            //{id:xxx,name:xxx}  客户端传递的:name=xxx
            //A、把传递进来的字符串转换为对象
            //B、给这个对象追加一个客户编号(唯一的),基于当前最大的编号累加一即可,如果当前一个客户信息都没有,则新增数据编号为一

            //->把最新的数据重新写入到文件中,并且把存储的结果返回给客户端
            var obj = formatData(passData);
            obj.id = customData.length === 0 ? 1 : parseFloat(customData[customData.length - 1].id) + 1;
            customData.push(obj);
            fs.writeFileSync(dataPath, JSON.stringify(customData), 'utf-8');
            result = {
                code: 0,
                msg: 'SUCCESS'
            };
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    }

    //->修改客户信息
    //1)接收客户端通过请求主体传递进来的结果,然后把其转化为对象 {id:xxx,name:'xxx'}
    //2)在所有的客户信息中进行查找(根据传递进来的ID和每一项客户的ID比较,如果相同,那么这一项就是我们需要替换的)，把新传递的内容替换原来的这一项
    //3)把最新的数组信息写入到文件中
    //4)返回
    if (pathname === '/updateInfo') {
        passData = '';
        req.on('data', function (chunk) {
            passData += chunk;
        });
        req.on('end', function () {
            var obj = formatData(passData);
            customData.forEach(function (item, index) {
                if (obj.id == item['id']) {
                    customData[index] = obj;
                    fs.writeFileSync(dataPath, JSON.stringify(customData), 'utf-8');
                    result = {
                        code: 0,
                        msg: 'SUCCESS'
                    }
                }
            });
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    }


    //->如果请求的接口不是以上五个中的任何一个
    res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
    res.end('BAD REQUEST URL!');

    //->formatData:把字符串转换为对象
    function formatData(passData) {
        var reg = /([^=&?#]+)=([^=&?#]+)/g;
        var obj = {};
        passData.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }
});
server.listen(8686, function () {
    console.log('server is success,listening on 8686 port!');
});