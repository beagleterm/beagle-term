// Copyright (c) 2012, Sungguk Lim. Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

chrome.app.runtime.onLaunched.addListener(function() {
  new BeagleWindow();
});

var BeagleWindow = function() {
  var connectedSerialId = 0;
  chrome.app.window.create(
    "index.html",
    {
      outerBounds: {
        width: 1024,
        height: 768
      }
    },
    function(win) {
      win.contentWindow.AddConnectedSerialId = function(id) {
        connectedSerialId = id;
      };
      win.onClosed.addListener(function() {
        chrome.serial.disconnect(connectedSerialId, function () {
        });
      });
    }
  );
}
