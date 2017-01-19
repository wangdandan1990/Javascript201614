var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    if (pathname === '/index.html') {
        var conFile = fs.readFileSync('./index.html');
        res.end(conFile);
    }
    if (pathname === '/css/index.css') {
        conFile = fs.readFileSync('./css/index.css');
        res.end(conFile);
    }
});
server.listen(80, function () {
    console.log('success!');
});