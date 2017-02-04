/*
 * ajax:封装一个方法库,实现AJAX的请求
 */
function ajax(options) {
    var d = {
        url: null,
        type: 'get',
        async: true,
        data: null, //->请求主体中放入的内容
        dataType: 'text',//->我们通过这属性预设一个数据格式,把服务器返回的内容转换为我们预设的格式即可:text、json、xml
        success: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {//->?
            d[key] = options[key];
        }
    }

    //->SEND AJAX
    var xhr = new XMLHttpRequest;
    xhr.open(d.type, d.url, d.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var val = xhr.responseText;
            switch (d.dataType) {
                case 'json':
                    val = 'JSON' in window ? JSON.parse(val) : eval('(' + val + ')');
                    break;
                case 'xml':
                    val = xhr.responseXML;
                    break;
            }
            //typeof d.success === 'function' ? d.success.call(xhr, val) : null;
            d.success && d.success.call(xhr, val);
        }
    };
    xhr.send(d.data);
}