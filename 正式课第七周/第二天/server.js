var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {
        var conFile = 'not found!';
        try {
            conFile = fs.readFileSync('.' + pathname);
        } catch (e) {

        }
        //->在响应头中设置返回内容的MIME类型:根据请求资源文件的后缀名计算出对应的MIME类型
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
        res.writeHead(200, {
            'content-type': suffixMIME + ';charset=utf-8;'
        });//->重写响应头信息 ->'text/html;charset=utf-8;'
        res.end(conFile);
    }
});
server.listen(80, function () {
    console.log('success!');
});
/*
 * MIME:每一种文件都有自己的类型
 * HTML -> text/html
 * CSS -> text/css
 * JS -> text/javascript
 * TXT -> text/plain
 * JSON -> application/json
 * GIF -> image/gif
 * PNG -> image/png
 * JPG -> image/jpeg
 * ...
 */