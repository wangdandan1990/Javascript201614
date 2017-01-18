var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    //->如果客户端请求的是资源文件(HTML/CSS/JS/IMG...=>它们都有后缀名),我们统一都按照如下的方式进行处理即可
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {
        var conFile = 'not found!';
        //->TRY CATCH:客户端请求的资源文件不存在的情况下,我们不让其报错,而是返回找不到即可
        try {
            conFile = fs.readFileSync('.' + pathname);
        } catch (e) {

        }
        res.end(conFile);
    }
    //->在IE下访问的时候存在的问题：
    //1、服务器返回给客户端的内容都是字符串(不管是HTML还是CSS)
    //2、谷歌浏览器比较的智能，会自己识别是什么格式的内容，然后进行渲染
    //3、IE小盆友比较弱智，我们返回的都是字符串，它不认识，所以不能把样式进行渲染
    //这样就需要我们在返回的同时，还要告诉浏览器，我返回的数据内容是什么格式的
});
server.listen(80, function () {
    console.log('success!');
});
