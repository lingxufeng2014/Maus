var rpcManager = require('../src/manager');
var express = require('express');
var app = express();

app.use('/js', express.static('./test'));
app.use('/', express.static('./test'));
app.listen(3000);

var a = new rpcManager(8124);


a.do(workers => {
    var log = x => console.log(x);
    var add = function(x, y) {
        return Promise.all([x, y])
            .then(arr => new Promise((resolve, reject) => {
                workers.add(arr[0], arr[1], result => resolve(result));
            }))
    }

    var fib = x => x > 1 ? add(fib(x - 1), fib(x - 2)) : x;

    setTimeout(() => {
        fib(20).then(result => console.log(result));
    }, 5000);


})
