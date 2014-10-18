// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// CSP means that we can't kick off the initialization from the html file,
// so we do it like this instead.
window.onload = function() {
  lib.init(Beagle.init);
};

/**
 * The Beagle-powered terminal command.
 *
 * This class defines a command that can be run in an hterm.Terminal instance.
 *
 * @param {Object} argv The argument object passed in from the Terminal.
 */
function Beagle(argv) {
  this.argv_ = argv;
  this.io = null;
  this.portInfo_ = null;
  this.connectionId = -1;
  this.keyboard_ = null;
  this.pid_ = -1;
};

/**
 * The name of this command used in messages to the user.
 *
 * Perhaps this will also be used by the user to invoke this command, if we
 * build a shell command.
 */
Beagle.prototype.commandName = 'beagle';

/**
 * Static initialier called from beagle.html.
 *
 * This constructs a new Terminal instance.
 */
Beagle.init = function() {
  /*
  ConnectDialog.show(function(portInfo) {
    // TODO(sunglim): We do not use storage. it should be removed.
    hterm.defaultStorage = new lib.Storage.Chrome(chrome.storage.sync);
    var terminal = new hterm.Terminal("BeagleTerminal");
    terminal.decorate(document.querySelector('#terminal'));

    terminal.onTerminalReady = function() {
      terminal.runCommandClass(Beagle, JSON.stringify(portInfo))
      return true;
    }
  });
  */
  hterm.defaultStorage = new lib.Storage.Chrome(chrome.storage.sync);
  var terminal = new hterm.Terminal("BeagleTerminal");
  terminal.decorate(document.querySelector('#terminal'));

  terminal.onTerminalReady = function() {
    terminal.runCommandClass(Beagle, document.location.hash.substr(1))
    this.io.println("Beagle Term, still beta. https://github.com/beagleterm/beagle-term");
    return true;
  }

  return true;
};

/**
 * Start the beagle command.
 *
 * This is invoked by the terminal as a result of terminal.runCommandClass().
 */
Beagle.prototype.run = function() {
  this.portInfo_ = "nike";//JSON.parse(this.argv_.argString);
  this.io = this.argv_.io.push();
  this.io.onVTKeystroke = this.sendString_.bind(this, true /* fromKeyboard */);
  this.io.sendString = this.sendString_.bind(this, false /* fromKeyboard */);
  this.connectionId = -1;

  document.body.onunload = this.close_.bind(this);

  this.io.println("Beagle Term, still beta. https://github.com/beagleterm/beagle-term");

  var port = this.portInfo_.port;
  var bitrate = Number(this.portInfo_.bitrate);
  var self = this;

  chrome.serial.connect(port, {'bitrate': bitrate}, function(openInfo) {
    self.io.println('Device found ' + port + ' connection Id ' + openInfo.connectionId);
    self.connectionId = openInfo.connectionId;

    AddConnectedSerialId(openInfo.connectionId);
    chrome.serial.onReceive.addListener(function(info) {
      if (info && info.data) {
        self.io.print(ab2str(info.data));
      }
    });
  });
};

var ab2str=function(buf) {
  var bufView=new Uint8Array(buf);
  var unis=[];
  for (var i=0; i<bufView.length; i++) {
    unis.push(bufView[i]);
  }
  return String.fromCharCode.apply(null, unis);
};

var str2ab = function(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
 * Send a string to the connected device.
 *
 * @param {string} string The string to send.
 */
Beagle.prototype.sendString_ = function(string) {
  var row = JSON.stringify(string);
  console.log('[sendString] ' + row);
  var self = this;
  if (self.connectionId != -1) {
    chrome.serial.send(self.connectionId, str2ab(string), function () {
     // TODO: callback.
    });
  }
};

/**
 * Exit the beagle command.
 */
Beagle.prototype.exit = function(code) {
  this.close_();
  this.io.pop();

  if (this.argv_.onExit) {
    this.argv_.onExit(code);
  }
};

/**
 * Closes beagle terminal.
 */
Beagle.prototype.close_ = function() {
  console.log('close_');
  var self = this;
  chrome.serial.disconnect(self.connectionId, function () {
    // TODO: callback.
  });
}
