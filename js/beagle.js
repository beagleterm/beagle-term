// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

lib.rtdep('lib.f',
          'hterm');

// CSP means that we can't kick off the initialization from the html file,
// so we do it like this instead.
window.onload = function() {
  lib.ensureRuntimeDependencies();
  hterm.init(Beagle.init);
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
  var profileName = lib.f.parseQuery(document.location.search)['profile'];
  var terminal = new hterm.Terminal(profileName);
  terminal.decorate(document.querySelector('#terminal'));

  // Useful for console debugging.
  window.term_ = terminal;

  // Looks like there is a race between this and terminal initialization, thus
  // adding timeout.
  setTimeout(function() {
      terminal.setCursorPosition(0, 0);
      terminal.setCursorVisible(true);
      terminal.runCommandClass(Beagle, document.location.hash.substr(1));
    }, 500);
  return true;
};

/**
 * Start the beagle command.
 *
 * This is invoked by the terminal as a result of terminal.runCommandClass().
 */
Beagle.prototype.run = function() {
  this.io = this.argv_.io.push();
  this.io.onVTKeystroke = this.sendString_.bind(this);
  this.io.sendString = this.sendString_.bind(this);
  this.io.onTerminalResize = this.onTerminalResize_.bind(this);  
  document.body.onunload = this.close_.bind(this);

  // Setup initial window size.
  this.onTerminalResize_(this.io.terminal_.screenSize.width, this.io.terminal_.screenSize.height);

  this.io.println(
    hterm.msg('WELCOME_VERSION', 
    ['\x1b[1m' + 'Beagle Term' + '\x1b[m', 
    '\x1b[1m' + 'BETA' + '\x1b[m']));

  var self = this;
  var port = '/dev/ttyUSB0';
  serial_lib.openSerial(port, function(openInfo) {
    self.io.println('Device found ' + port + ' connection Id ' + openInfo.connectionId);

    serial_lib.startListening(function(string) {
      console.log('[onRead_] ' + string);
      self.io.print(string);
    });
  });
};

/**
 * Send a string to the connected device.
 *
 * @param {string} string The string to send.
 */
Beagle.prototype.sendString_ = function(string) {
  var row = JSON.stringify(string);
  console.log('[sendString] ' + row);

  if (!serial_lib.isConnected()) {
    return;
  }

  serial_lib.writeSerial(string);
};

/**
 * Read a string from the connected device.
 *
 * @param {string} string The received string.
 */
Beagle.prototype.onRead_ = function(string) {
  
};

/**
 * Notify process about new terminal size.
 *
 * @param {string|integer} terminal width.
 * @param {string|integer} terminal height.
 */
Beagle.prototype.onTerminalResize_ = function(width, height) {

};

/**
 * Exit the beagle command.
 */
Beagle.prototype.exit = function(code) {
  this.close_();
  this.io.pop();

  if (this.argv_.onExit)
    this.argv_.onExit(code);
};

/**
 * Closes beagle terminal.
 */
Beagle.prototype.close_ = function() {

}
