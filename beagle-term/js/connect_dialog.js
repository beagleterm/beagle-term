'use strict';

var ConnectDialog = function() {};

ConnectDialog.show = function(onComplete) {
  lib.ensureRuntimeDependencies();
  $('a[rel*=leanModal]').leanModal({closeButton: '#connect'});
  
  var $portPicker = $('#port-picker');
  var $bitratePicker = $('#bitrate-picker');

  this.loadBitrate();
  
  // Build port picker
  chrome.runtime.getBackgroundPage(function(bgPage) {
    bgPage.serial_lib.getPorts(function(ports) {
      var eligiblePorts = ports.filter(function(port) {
        return !port.match(/[Bb]luetooth/);
      });

      if (eligiblePorts.length > 0) {
        eligiblePorts.forEach(function(port) {
          var $option = $('<option>' + port + '</option>').attr('value', port);
          $portPicker.append($option);
        });

        // Show setup dialog
        $('#connect-dialog-trigger').click();

      } else {
        // Show error dialog
        MessageDialog.show('Could not find serial device. Please check your serial connection and try again.');
      }
    });
  });

  $('#connect').click(function() {
    if (onComplete) {
      ConnectDialog.saveBitrate($bitratePicker.val());
      onComplete({
        port: $portPicker.val(),
        bitrate: $bitratePicker.val()
      });
    }
  });
};

ConnectDialog.saveBitrate = function(bitrate) {
  var BITRATE_KEY = 'bit_rate'; //when you change this value, you also must check loadBitrate();
  var obj = {};
  obj[BITRATE_KEY] = bitrate;
  chrome.storage.local.set(obj);
};

ConnectDialog.loadBitrate = function() {
  var BITRATE_KEY = 'bit_rate'; //when you change this value, you also must check saveBitrate();
  chrome.storage.local.get(BITRATE_KEY,function(result){
    if (result.bit_rate !== undefined) {
      $('#bitrate-picker').val(result[BITRATE_KEY]);
    }
  });
};
