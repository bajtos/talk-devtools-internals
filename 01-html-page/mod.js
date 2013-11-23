(function(window, document){
  function MyObj() {
  }

  MyObj.prototype = {
    myFunc: function(msg) {
      var ary = new Array(10);
      append(msg);
    }
  };

  function log(msg) {
    new MyObj().myFunc(msg);
  }

  log(' from mod.js');

})(window, document);
