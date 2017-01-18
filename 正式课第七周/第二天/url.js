var url = require('url');
var str = 'http://www.zhufengpeixun.com:80/student/index.html?name=zxt&age=30#haha';
var result = url.parse(str);
console.log(result);

result = url.parse(str, true);
console.log(result);