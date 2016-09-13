// Copyright (c) 2012, Sungguk Lim. Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var input_output;
var self;

document.addEventListener("DOMContentLoaded", function(){
  $("#settingsModal").modal("show");
}, false);

/*
 *  Utility functions
 *
 *  TODO: Extract to another file
 */

// Converts ArrayBuffer to String.
var ab2str = function(buf) {
  var bufView = new Uint8Array(buf);
  var unis = [];
  for (var i = 0; i < bufView.length; i++) {
    unis.push(bufView[i]);
  }
  return String.fromCharCode.apply(null, unis);
};

// Converts String to ArrayBuffer.
var str2ab = function(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

var getIndexByValue = function(element, value) {
  var list = element.options;
  for(var i = 0; i < list.length; i++) {
    if (list[i].value === value) {
      return i;
    }
  }
}

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

    chrome.serial.getDevices(function (ports) {
      if (ports.length > 0) {
        ports.forEach(function (portNames) {
          var portPicker = document.querySelector("#portDropdown");
          var portName = portNames.path;
          portPicker.innerHTML = portPicker.innerHTML + '<option value="' +
            portName + '">' + portName + '</option>';
        });
      }
    });

    // TODO: Pass json object instead of each element('bitrate', 'dataBits' ..)
    chrome.storage.local.get("bitrate", function (result) {
      if (result.bitrate !== undefined) {
        var bitrateSelectElement = document.querySelector("#bitrateDropdown");
        bitrateSelectElement.selectedIndex =
            getIndexByValue(bitrateSelectElement, result["bitrate"].toString());
      } else {
        var bitrateSelectElement = document.querySelector("#bitrateDropdown");
        bitrateSelectElement.selectedIndex = getIndexByValue(bitrateSelectElement, "115200");
      }
    });

    chrome.storage.local.get("dataBits", function (result) {
      if (result.dataBits !== undefined) {
        var databitSelectElement = document.querySelector("#databitDropdown");
        databitSelectElement.selectedIndex = getIndexByValue(databitSelectElement, result["dataBits"]);
      } else {
        var databitSelectElement = document.querySelector("#databitDropdown");
        databitSelectElement.selectedIndex = getIndexByValue(databitSelectElement, "eight");
      }
    });

    chrome.storage.local.get("parityBit", function (result) {
      if (result.parityBit !== undefined) {
        var paritybitSelectElement = document.querySelector("#parityDropdown");
        paritybitSelectElement.selectedIndex = getIndexByValue(paritybitSelectElement, result["parityBit"]);
      } else {
        var paritybitSelectElement = document.querySelector("#parityDropdown");
        paritybitSelectElement.selectedIndex = getIndexByValue(paritybitSelectElement, "no");
      }
    });

    chrome.storage.local.get("stopBits", function (result) {
      if (result.stopBits !== undefined) {
        var stopbitSelectElement = document.querySelector("#stopbitDropdown");
        stopbitSelectElement.selectedIndex = getIndexByValue(stopbitSelectElement, result["stopBits"]);
      } else {
        var stopbitSelectElement = document.querySelector("#stopbitDropdown");
        stopbitSelectElement.selectedIndex = getIndexByValue(stopbitSelectElement, "one");
      }
    });

    chrome.storage.local.get("ctsFlowControl", function (result) {
      if (result.ctsFlowControl !== undefined) {
        var flowControlSelectElement = document.querySelector("#flowControlDropdown");
        flowControlSelectElement.selectedIndex =
            getIndexByValue(flowControlSelectElement, result["ctsFlowControl"].toString());
      } else {
        var flowControlSelectElement = document.querySelector("#flowControlDropdown");
        flowControlSelectElement.selectedIndex = getIndexByValue(flowControlSelectElement, "false");
      }
    });
  };

  this.sendString_ = function(fromKeyboard, string) {
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

    // Format is ...
    // settings = Object {bitrate: 14400, dataBits: "eight", parityBit: "odd",
    // stopBits: "two", ctsFlowControl: true}
    var settings = {
      bitrate: bitrate,
      dataBits: databit,
      parityBit: parity,
      stopBits: stopbit,
      ctsFlowControl: flowControl
    };

    chrome.storage.local.set(settings);

    chrome.serial.connect(port, {
      "bitrate": settings.bitrate,
      "dataBits": settings.dataBits,
      "parityBit": settings.parityBit,
      "stopBits": settings.stopBits,
      "ctsFlowControl": settings.ctsFlowControl
    }, function(openInfo) {
      if (openInfo === undefined) {
        input_output.println("Unable to connect to with value" + settings.toString());
        // TODO: Open 'connection dialog' again.
        return;
      }

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
