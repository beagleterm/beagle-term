// Copyright (c) 2016, Sungguk Lim. Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

function DrawUi() {}

DrawUi.prototype = {
  ShowSettingsDialog: function() {
    $('#settingsModal').modal('show');
  },

  /**
   * Called when Hterm terminmal is finished to load.
   * Every ui configuration(e.g. foo_button.focus() should be in here)
   */
  OnHtermReady: function() {
    $('.modal-footer button').focus();
    this.registerConnectBtnEvent_();
  },

  /**
   * @private
   */
  registerConnectBtnEvent_: function() {
    var connectBtn = document.querySelector('#connectBtn');
    connectBtn.addEventListener('click', function(event) {
      // Get the serial port (i.e. COM1, COM2, COM3, etc.)
      var portSelect = document.querySelector('#portDropdown');
      var port = portSelect.options[portSelect.selectedIndex].value;

      // Get the baud rate (i.e. 9600, 38400, 57600, 115200, etc. )
      var baudSelect = document.querySelector('#bitrateDropdown');
      var bitrate = Number(baudSelect.options[baudSelect.selectedIndex].value);

      // Get the data bit (i.e. "seven" or "eight")
      var databitSelect = document.querySelector('#databitDropdown');
      var databit = databitSelect.options[databitSelect.selectedIndex].value;

      // Get the parity bit (i.e. "no", "odd", or "even")
      var paritySelect = document.querySelector('#parityDropdown');
      var parity = paritySelect.options[paritySelect.selectedIndex].value;

      // Get the stop bit (i.e. "one" or "two")
      var stopbitSelect = document.querySelector('#stopbitDropdown');
      var stopbit = stopbitSelect.options[stopbitSelect.selectedIndex].value;

      // Get the flow control value (i.e. true or false)
      var fcSelect = document.querySelector('#flowControlDropdown');
      var flowControlValue = fcSelect.options[fcSelect.selectedIndex].value;
      var flowControl = (flowControlValue === 'true');

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
        'bitrate': settings.bitrate,
        'dataBits': settings.dataBits,
        'parityBit': settings.parityBit,
        'stopBits': settings.stopBits,
        'ctsFlowControl': settings.ctsFlowControl
      }, function(openInfo) {
        if (openInfo === undefined) {
          inputOutput.println('Unable to connect to device with value' +
              settings.toString());
          // TODO: Open 'connection dialog' again.
          return;
        }

        inputOutput.println('Device found on ' + port +
                  ' via Connection ID ' + openInfo.connectionId);
        self.connectionId = openInfo.connectionId;
        AddConnectedSerialId(openInfo.connectionId);
        chrome.serial.onReceive.addListener(function(info) {
          if (info && info.data) {
            inputOutput.print(ab2str(info.data));
          }
        });
      });
    });
  }
};
