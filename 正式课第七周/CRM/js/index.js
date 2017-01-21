/*
 * 首页模块的相关操作
 * 1.从服务器端获取全部的客户信息
 * 2.使用字符串拼接的方式做数据绑定
 */
var indexRender = (function () {
    var content = document.getElementById('content');

    //->bindHTML:实现数据绑定
    function bindHTML(data) {
        var str = '';
        for (var i = 0, len = data.length; i < len; i++) {
            var cur = data[i];
            str += '<li>';
            str += '<span>' + cur.id + '</span>';
            str += '<span>' + cur.name + '</span>';
            str += '<span>';
            str += '<a href="">修改</a>';
            str += '<a href="">删除</a>';
            str += '</span>';
            str += '</li>';
        }
        content.innerHTML = str;
    }

    return {
        init: function () {
            //->GET DATA
            ajax('/getAllList', {
                cache: false,
                success: function (result) {
                    if (result && result.code == 0) {
                        bindHTML(result.data);

                    }
                }
            });
        }
    }
})();
indexRender.init();
