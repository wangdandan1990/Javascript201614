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
            str += '<a href="detail.html?id=' + cur.id + '">修改</a>';//->点击修改,依然跳转到DETAIL页面,但是在这个页面如何区分是增加还是修改呢? 点击增加除了跳转什么都不传递,点击修改不仅传递内容而且传递的还是要修改的客户编号，这样到了DETAIL页面，我们只需要获取URL问号传参的值，就可以知道是增加还是修改，以及修改的是谁了.
            str += '<a href="javascript:;" data-id="' + cur.id + '">删除</a>';
            str += '</span>';
            str += '</li>';
        }
        content.innerHTML = str;
    }

    //->deleteInfo:删除按钮的点击事件
    function deleteInfo() {
        content.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarTag = tar.tagName.toUpperCase();
            if (tarTag === 'A' && tar.innerHTML === '删除') {
                /*
                 * 1.提醒用户是否要删除
                 * 2.向服务器发送AJAX请求,告诉服务器要删除谁
                 *
                 * JS中的提示框
                 *   alert:提示框,只是一个提示,没有让用户自己确认取消的功能
                 *   confirm:确认框,提供了确认和取消两个操作 var flag = confirm(); FLAG为TRUE说明点击的是确认按钮，反之是取消按钮
                 *   prompt:在confirm基础上提供了一个输入框,可以允许用户填写一些信息 var val = prompt(); VAL就是用户在输入框中填写的内容
                 */
                var customId = tar.getAttribute('data-id'),
                    flag = confirm('亲，你确定要删除编号为 [ ' + customId + ' ] 的信息吗?');
                if (flag) {
                    ajax('/removeInfo', {
                        cache: false,
                        data: {
                            id: customId
                        },
                        success: function (result) {
                            if (result && result.code == 0) {
                                alert('亲，删除成功了啊!');
                                //->window.location.href = window.location.href; 刷新页面(让其跳转到当前页面)
                                content.removeChild(tar.parentNode.parentNode);
                            } else {
                                alert('亲，删除失败了哈!');
                            }
                        }
                    });
                }
            }
        }
    }

    return {
        init: function () {
            //->GET DATA
            ajax('/getAllList', {
                cache: false,
                success: function (result) {
                    if (result && result.code == 0) {
                        bindHTML(result.data);
                        deleteInfo();
                    }
                }
            });
        }
    }
})();
indexRender.init();
