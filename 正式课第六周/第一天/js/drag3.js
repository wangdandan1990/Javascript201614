/**
 * Created by 39753 on 2017/1/10.
 */
    var oDiv = document.getElementById('div');//可变的，参数
    on(oDiv, 'mousedown', down);
    function down(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.l = this.offsetLeft;
        this.t = this.offsetTop;
        if (this.setCapture) {
            this.setCapture();
            on(this, 'mousemove', move);
            on(this, 'mouseup', up);
        } else {
            this.MOVE = processThis(move, this);
            this.UP = processThis(up, this);
            on(document, 'mousemove', this.MOVE);
            on(document, 'mouseup', this.UP);
            e.preventDefault();
        }
        //跟原始拖拽无关的代码。。。。。。
        fire.call(this,'selfDown',e);

    }
    function move(e) {
        //保证move中的this必须是oDiv;
        this.style.left = e.clientX - this.x + this.l + 'px';
        this.style.top = e.clientY - this.y + this.t + 'px';
        //跟原始拖拽无关的代码。。。。。。
        fire.call(this,'selfMove',e)
    }

    function up() {
        if (this.releaseCapture) {
            this.releaseCapture();
            off(this, 'mousemove', move);
            off(this, 'mouseup', up);
        } else {
            off(document, 'mousemove', this.MOVE);
            off(document, 'mouseup', this.UP);
        }
        //跟原始拖拽无关的代码。。。。。。
        fire.call(this,'selfUp');
    }