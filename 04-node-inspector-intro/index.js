var http = require('http');

function func(arg1, arg2) {
  var result = 'Hello world!';
  result += '\n  arg1: '
  result += arg1;
  result += '\n  arg2: ';
  result += arg2;
  return result;
}

var server = http.createServer(function(req, resp) {
  var str = 'a string';
  var num = 42;

  var text = 'From: ' + req.socket.remoteAddress + '\n\n';
  text +=  func(str, num) + '\n'

  resp.setHeader('Content-Type', 'text/plain');
  resp.end(text);
});

server.listen(3000, function() {
  console.log('listening on port 3000');
});

