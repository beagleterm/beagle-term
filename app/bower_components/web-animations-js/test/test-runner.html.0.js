
'use strict';
window.onerror = function(msg, url, line) {
  // Ignore errors caused by webdriver
  if (msg.match(/webdriver/))
    return;

  if (document.getElementById('javascript-errors') == null) {
    document.body.innerHTML = '<pre id="javascript-errors">JAVASCRIPT ERRORS\n\n</pre>';
  }

  var e = document.getElementById('javascript-errors');
  var msg = 'Javascript Error in ' + url + '\n' +
      'Line ' + line + ': ' + msg + '\n';
  e.innerHTML += msg;
};
