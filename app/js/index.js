// Copyright 2016 The Beagle term Authors. All rights reserved.
// Use of this source code is governed by BSD LICENSE.

var input_output;
var self;

document.addEventListener("DOMContentLoaded", function(){
  $("#settingsModal").modal("show");
}, false);

// utility. extract to another file.
var ab2str = function(buf) {
  var bufView = new Uint8Array(buf);
  var unis = [];
  for (var i = 0; i < bufView.length; i++) {
    unis.push(bufView[i]);
  }
  return String.fromCharCode.apply(null, unis);
};

var str2ab = function(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

var Crosh = function(argv) {
  this.argv_ = argv;
  this.io = null;
  this.keyboard_ = null;
  this.pid_ = -1;
  this.connectionId = -1;
  this.portInfo_ = null;
  this.run = function() {
    this.io = this.argv_.io.push();

    this.io.onVTKeystroke = this.sendString_.bind(this, true /* fromKeyboard */);
    this.io.sendString = this.sendString_.bind(this, false /* fromKeyboard */);
    this.io.println("Beagle Term. https://github.com/beagleterm/beagle-term");
    input_output = this.io;
    self = this;
    chrome.serial.getDevices(function(ports) {
      var eligiblePorts = ports;

      if (eligiblePorts.length > 0) {
        eligiblePorts.forEach(function(portNames) {
          var portPicker = document.querySelector("#portDropdown");
          var portName = portNames.path;
          portPicker.innerHTML = portPicker.innerHTML + '<option value="' +
                                 portName +'">' + portName + '</option>';
        });
      }
    });

    chrome.storage.local.get("bitrate", function(result) {
      if (result.bit_rate !== undefined) {
        document.querySelector("#bitrateDropdown").value = result["bitrate"];
      } else {
        document.querySelector("#bitrateDropdown").value = "115200";
      }
    });
  };
  this.sendString_ = function(fromKeyboard, string) {
    console.log("nike" + string);
    chrome.serial.send(self.connectionId, str2ab(string), function () { });
  };
  this.exit = function(code) {
  };
};

window.onload = function() {
  hterm.defaultStorage = new lib.Storage.Chrome(chrome.storage.sync);
  var t = new hterm.Terminal("opt_profileName");
  t.decorate(document.querySelector("#terminal"));

  t.onTerminalReady = function() {
    t.runCommandClass(Crosh, document.location.hash.substr(1));
    return true;
  };
};

// Closes the settings dialog
document.querySelector("#connectBtn").addEventListener("click", function(event) {
  // If |input_output| is null, it means hterm is not ready yet.
  if (!input_output)
    return;

    // Get the serial port (i.e. COM1, COM2, COM3, etc.)
    var portElement = document.querySelector("#portDropdown");
    var port = portElement.options[portElement.selectedIndex].value;

    // Get the baud rate (i.e. 9600, 38400, 57600, 115200, etc. )
    var bitrateElement = document.querySelector("#bitrateDropdown");
    var bitrate = Number(bitrateElement.options[bitrateElement.selectedIndex].value);

    // Get the data bit (i.e. "seven" or "eight")
    var databitElement = document.querySelector("#databitDropdown");
    var databit = databitElement.options[databitElement.selectedIndex].value;

    // Get the parity bit (i.e. "no", "odd", or "even")
    var paritybitElement = document.querySelector("#parityDropdown");
    var parity = paritybitElement.options[paritybitElement.selectedIndex].value;

    // Get the stop bit (i.e. "one" or "two")
    var stopbitElement = document.querySelector("#stopbitDropdown");
    var stopbit = stopbitElement.options[stopbitElement.selectedIndex].value;

    // Get the flow control value (i.e. true or false)
    var flowControlElement = document.querySelector("#flowControlDropdown");
    var flowControlValue = flowControlElement.options[flowControlElement.selectedIndex].value;
    var flowControl = (flowControlValue === "true");

    var settings = {
      bitrate: bitrateElement.options[bitrateElement.selectedIndex].value,
      dataBits: databit,
      parityBit: parityBit,
      stopBits: stopbit,
      ctsFlowControl: flowControl
    };

    // settings[BITRATE_KEY] = bitrateElement.options[bitrateElement.selectedIndex].value;
    chrome.storage.local.set(settings);

    chrome.serial.connect(port, {
      "bitrate": settings.bitrate,
      "dataBits": settings.dataBits,
      "parityBit": settings.parityBit,
      "stopBits": settings.stopBits,
      "ctsFlowControl": settings.ctsFlowControl
    }, function(openInfo) {
      input_output.println("Device found on " + port + " via Connection ID " + openInfo.connectionId);
      self.connectionId = openInfo.connectionId;
      AddConnectedSerialId(openInfo.connectionId);
      chrome.serial.onReceive.addListener(function(info) {
        if (info && info.data) {
          input_output.print(ab2str(info.data));
        }
      });
    });
});
