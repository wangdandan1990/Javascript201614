'use strict';

/**
 * Created by 39753 on 2017/1/1.
 */
var fn = function fn(a, b) {
  return console.log(a + b);
};
fn(3, 4);
var obj = { name: 'zhufeng', dec: '元旦不放假' };
var a = 1;
var s = '啦啦';
var fn1 = function fn1() {
  return 5;
};
var objOther = { __proto__: obj, a: a, s: s, fn1: fn1 };
alert(objOther.fn1());