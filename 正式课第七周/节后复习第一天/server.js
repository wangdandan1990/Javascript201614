var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    //->获取客户端请求的URL地址,然后进行解析,最后得到:
    //请求资源文件的路径名称(pathname)
    //问号传参方式传递过来的参数值(query)
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->统一处理客户端资源文件的请求
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {
        //->如果请求的资源文件不存在,我们做一个容错处理
        var conFile = null,
            status = null;
        try {
            conFile = fs.readFileSync('.' + pathname);
            status = 200;
        } catch (e) {
            conFile = 'not found!';
            status = 404;
        }

        //->服务器返回给客户端的内容都是字符串格式的,但是IE这个弱智小朋友识别不了具体是什么样的文件内容,所以我们返回的时候还需要指定对应的MIME类型
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
    }
});
server.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});