var a = require('./A');
function avg() {
    arguments.__proto__ = Array.prototype;
    arguments.sort(function (cur, next) {
        return cur - next;
    });
    arguments.pop();
    arguments.shift();
    //a.sum(arguments) -> a.sum([98,95,96...]) 目标:a.sum(98,95,96...)
    return (a.sum.apply(null, arguments) / arguments.length).toFixed(2);
}
module.exports = {
    avg: avg
};