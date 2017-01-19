var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (req, res) {
    //->request(req):请求,存储所有客户端的请求信息
    //-->req.url:存储了客户端请求资源文件的路径名称以及问号传递参数的值

    //->response(res):响应,提供一系列的方法供服务器端向客户端返回内容
    //-->res.write:向客户端返回内容,需要返回多次就执行多次即可
    //-->res.end:结束响应,这个必须有,只有结束才证明这件事完成了

    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    //->如果客户端请求的是index.html文件,我们需要把这个文件中的原代码获取到,然后在返回给客户端
    if (pathname === '/index.html') {
        var conFile = fs.readFileSync('./index.html');
        res.end(conFile);
    }
    //res.write('hello');
    //res.write('world');
    //res.end();

    //->sync:同步
    //->async:异步
});
server1.listen(80, function () {
    console.log('hello world 80!');
});
