/*
 * 1.客户端资源文件的请求处理：客户端请求的是HTML/CSS/JS...，我们需要把服务器上指定文件中的源代码返回给客户端
 * 2.处理客户端AJAX的数据请求：如果是获取数据，我们把数据从服务器上找到，然后返回给客户端，如果是增加或者修改数据的请求，我们需要把服务上的原有数据进行修改...\
 * 注意：真实项目中我们的数据存储都在服务器的数据库中进行(access、mysql、sql server、oracle、mongodb...)、我们本次不使用数据存储，用一个JSON文件先临时代替
 */
var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;//->客户端请求地址问号传递参数的值都在这存储(客户端只要是GET请求,传递的参数值都在这里)

    //->处理静态资源文件的请求
    var reg = /\.([a-zA-Z0-9]+)/i;
    if (reg.test(pathname)) {
        var conFile = 'not found~',
            status = 404;
        try {
            conFile = fs.readFileSync('.' + pathname);
            status = 200;
        } catch (e) {
        }
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case "HTML":
                suffixMIME = 'text/html';
                break;
            case "CSS":
                suffixMIME = 'text/css';
                break;
            case "JS":
                suffixMIME = 'text/javascript';
                break;
        }
        res.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8;'});
        res.end(conFile);
        return;
    }

    //->处理API接口请求
    var dataPath = './json/custom.json',//->存储数据的文件地址
        customData = fs.readFileSync(dataPath),//->获取当前所有的客户
        result = {code: 1, msg: 'error', data: null};//->定义默认返回内容的一个模板(失败情况)
    customData = JSON.parse(customData);//->把我们获取的客户信息(字符串)转换为JSON格式的对象,方便后期的操作

    //->1)获取所有客户信息
    if (pathname === '/getAllList') {
        //->如果客户信息存在的话,我们返回成功的信息,把客户信息准备好
        if (customData.length > 0) {
            result = {
                code: 0,
                msg: 'success',
                data: customData
            };
        }
        //->返回:为了防止IE弱智,我们指定返回数据的MIME类型
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));//->服务器端返回的数据可能是以下类型:字符串(JSON字符串)、XML、BUFFER...
        return;
    }

    //->2)获取指定客户信息
    if (pathname === '/getInfo') {
        //->接收客户端传递进来的ID
        var passId = query['id'];

        //->循环总数据,找到和传递进来的ID相同的那一项
        customData.forEach(function (item) {
            if (item['id'] == passId) {
                result = {
                    code: 0,
                    msg: 'success',
                    data: item
                };
            }
        });

        //->返回
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    //->3)删除
    if (pathname === '/removeInfo') {
        passId = query['id'];
        var isRm = false;
        customData.forEach(function (item, index) {
            if (item['id'] == passId) {
                customData.splice(index, 1);
                isRm = true;
            }
        });
        if (isRm) {
            fs.writeFileSync(dataPath, JSON.stringify(customData));
            result = {
                code: 0,
                msg: 'success'
            };
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    //->4)增加
    if (pathname === '/addInfo') {
        //->把客户端通过POST请求,放在请求主体中传递过来的数据获取到
        var passText = '';
        req.on('data', function (chunk) {
            //->正在一点点的接收请求主体内容,chunk就是每一次接收的那一部分信息
            passText += chunk;
        });
        req.on('end', function () {
            //->请求主体信息接收完成:passText => 'name=xxx&...'
            passText = formatData(passText);

            //->需要给新增加的信息分配一个自增长的ID
            passText['id'] = customData.length == 0 ? 1 : parseInt(customData[customData.length - 1]['id']) + 1;

            //->实现增加：先把信息放全部客户信息的数组中，然后在把最新的数据写入到指定的文件中
            customData.push(passText);
            fs.writeFileSync(dataPath, JSON.stringify(customData));
            result = {code: 0, mag: 'success'};

            //->返回
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    }

    //->5)修改
    if (pathname === '/updateInfo') {
        passText = '';
        req.on('data', function (chunk) {
            passText += chunk;
        });
        req.on('end', function () {
            passText = formatData(passText);
            customData.forEach(function (item, index) {
                if (item['id'] == passText['id']) {
                    customData[index] = passText;
                    fs.writeFileSync(dataPath, JSON.stringify(customData));
                    result = {
                        code: 0,
                        msg: 'success'
                    };
                }
            });
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    }

    //->请求的地址不是以上任何的地址,说明地址是错误的
    res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
    res.end('not found~');
});
server.listen(81, function () {
    console.log('ok');
});

//->FORMAT DATA
function formatData(text) {
    //->TEXT:'xxx=xxx&xxx=xxx...'
    var reg = /([^&]+)=([^&]+)/g,
        obj = {};
    text.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}











