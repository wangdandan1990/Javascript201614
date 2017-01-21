/*
 * 详情页面的操作处理
 * 1.给提交按钮绑定点击事件,当点击的时候完成增加的操作
 */
var detailRender = (function () {
    var submit = document.getElementById('submit'),
        userName = document.getElementById('userName');

    function bindEvent() {
        var val = userName.value;
        if (val.length === 0) {
            alert('warning：content not empty~');
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
            //->BIND CLICK
            submit.onclick = bindEvent;

        }
    }
})();
detailRender.init();