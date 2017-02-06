/*
 * 详情页面的操作处理
 * 1.首先获取URL后面的参数值：确认是增加还是修改、修改的话需要知道修改的是谁
 * 2.如果是修改的话,我们首先要获取到原有的信息,展示在页面的文本框中
 * 3.给提交按钮绑定点击事件,当点击的时候完成增加的操作
 */
//->'http://localhost/detail.html?id=9&age=8' =>{id:9,age:8}
~function (pro) {
    //->myQueryParameter:解析一个URL地址问号传递参数的值
    function myQueryParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            //->arguments[0] 大正则捕获的内容
            //->arguments[1] 第一个分组捕获的内容 =>对象的属性名
            //->arguments[2] 第二个分组捕获的内容 =>对象的属性值
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.myQueryParameter = myQueryParameter;
}(String.prototype);


var detailRender = (function () {
    var submit = document.getElementById('submit'),
        userName = document.getElementById('userName');

    function bindEvent(customId) {
        var val = userName.value;
        if (val.length === 0) {
            alert('warning：content not empty~');
            return;
        }

        if (typeof customId !== 'undefined') {
            //->SEND UPDATE
            ajax('/updateInfo', {
                method: 'post',
                data: {
                    id: customId,
                    name: val
                },
                success: function (result) {
                    if (result && result.code == 0) {
                        alert('亲，修改成功了哦!');
                        window.location.href = 'index.html';
                    } else {
                        alert('亲，修改失败了哈!');
                    }
                }
            });
            return;
        }

        //->SEND ADD
        ajax('/addInfo', {
            method: 'post',
            data: {
                name: val
            },
            success: function (result) {
                if (result && result.code == 0) {
                    alert('亲，增加成功了哦~');
                    //->跳转回首页
                    //->window.location.href='地址' JS中实现页面跳转的一种方式，也可以使用window.open('地址')来处理
                    window.location.href = 'index.html';
                } else {
                    alert('o my god，增加失败~');
                }
            }
        });
    }

    return {
        init: function () {
            //->获取URL参数值,确定是增加还是修改
            var urlObj = window.location.href.myQueryParameter(),
                customId = urlObj['id'];
            if (typeof customId !== 'undefined') {//->修改
                //->获取原来的信息进行展示
                ajax('/getInfo', {
                    cache: false,
                    data: {id: customId},
                    success: function (result) {
                        if (result && result.code == 0) {
                            result = result['data'];
                            userName.value = result.name;
                        }
                    }
                });
            }


            //->BIND CLICK
            //submit.onclick = bindEvent.bind(submit, customId);
            submit.onclick = function () {
                bindEvent.call(this, customId);
            }
        }
    }
})();
detailRender.init();