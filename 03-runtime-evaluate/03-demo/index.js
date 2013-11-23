var colors = require('colors');

console.log(colors.cyan(
'(1) Runtime.evaluate({"expression":"throw new Error(\'foo\')"}, print)\n' +
'\n' +
'(2) Runtime.callFunctionOn({\n' +
'  "objectId": <id>,\n' +
'  "functionDeclaration": "function getStacktrace() { return this.stack; }"\n' +
'}, print)\n' +
'\n' +
'(3) Runtime.releaseObject({"objectId": <id> }, print)\n' +
'\n'
));

global.print = function(err, result) {
  if (err) {
    console.log('FAILED!', err.stack);
    return;
  }

  var pretty = JSON.stringify(result, null, 2)
    .replace(/\\n/g, '\n\u21B3'.grey);
  console.log('\nresponse:', pretty);
}

console.log('Starting chrome-remote-interface REPL...\n');
var Chrome = require('chrome-remote-interface/bin/repl.js');

return;

// Below is an older version of the script.
// It runs all commands non-interactively.

var Chrome = require('chrome-remote-interface');

Chrome(function (chrome) {
  var errorObjectId;

  evaluateThrow();

  function evaluateThrow() {
    var req = { expression: 'throw new Error("foo")' };
    logRequest(
      'Runtime.evaluate(' + JSON.stringify(req) + ', cb)');
    chrome.Runtime.evaluate(
      req,
      printEvaluateResult);
  }

  function printEvaluateResult(err, data) {
    logResponse(data);
    errorObjectId = data.result.objectId;

    var req = {
      objectId: errorObjectId,
      functionDeclaration: getStacktrace.toString()
    };
    logRequest(
      'Runtime.callFunctionOn(' + JSON.stringify(req, null, 2) + ', cb)');
    chrome.Runtime.callFunctionOn(
      req,
      printStack
    );

    function getStacktrace() { return this.stack; }
  }

  function printStack(err, data) {
    logResponse(data);

    var req = { objectId: errorObjectId };
    logRequest(
      'Runtime.releaseObject(' + JSON.stringify(req) + ', cb)');
    chrome.Runtime.releaseObject(req, done);
  }

  function done(err, data) {
    logResponse(data);
    logRequest('close()');
    chrome.close();
  }
});

function logRequest(str) {
  console.log(colors.cyan('\n<< ' + str));
}

function logResponse(obj) {
  var pretty = JSON.stringify(obj, null, 2)
    .replace(/\\n/g, '\n\u21B3'.grey);
  console.log(pretty);
}
