var httpProxy = require('./lib/http-proxy.js')

var proxy = httpProxy.createProxy();

var options = {
  'foo.com': 'http://localhost:8001',

  'bar.com': 'http://localhost:8002'
}

require('http').createServer(function(req, res) {

    console.log(req.headers);

  proxy.web(req, res, {

    target: options[req.headers.host]

  }, function (e) {console.log(e);});

}).listen(8000);

require('http').createServer(function(req, res) {

  res.end('done@8001\n');
}).listen(8001);


require('http').createServer(function(req, res) {

  res.end('done@8002\n');
}).listen(8002);


require('http').createServer(function(req, res) {

  var query = require('url').parse(req.url, true).query;

  options[query.src] = query.dst;

  res.end('ok');
}).listen(7238);

