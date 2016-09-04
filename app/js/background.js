// Copyright 2015 The Beagle term Authors. All rights reserved.
// Use of this source code is governed by MIT LICENSE.

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
