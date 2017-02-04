/*
 * 真实项目中最常用的一种编程模式:
 *   单例模式
 *     实现了分组分类的作用,避免全局变量的污染
 *
 *   命令模式
 *     提供一个唯一的入口init，在这个入口方法中规划所有功能的先后执行顺序以及依赖关系等
 */
var indexRender = (function () {

    //->bindHTML:数据绑定
    function bindHTML(data) {

    }


    return {
        init: function () {
            //->从服务器端获取所有的客户信息
            ajax('/getAllList', {
                method: 'GET',
                cache: false,
                dataType: 'JSON',
                success: function (result) {
                    if (result && result.code == 0) {
                        var data = result.data;

                        //->数据绑定
                        bindHTML(data);
                    }
                }
            });
        }
    }
})();
indexRender.init();