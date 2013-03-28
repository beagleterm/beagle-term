'use strict';

var ConnectDialog = function() {};

ConnectDialog.show = function(onComplete) {
  lib.ensureRuntimeDependencies();
  $('a[rel*=leanModal]').leanModal({closeButton: '#connect'});
  
  var port = null;
  var bitrate = 9600;
  var $portPicker = $('#port-picker');
  var $bitratePicker = $('#bitrate-picker');
  var storage = chrome.storage.local;
  
  var BITRATE_KEY = 'bit_rate';
  var obj = {};
  
  storage.get(BITRATE_KEY,function(result){
    console.log('have;? : ' + result.bit_rate);
    if (result.bitrate != '') { //if not empty or not in a list of bitrate
        $('#bitrate-picker').val(result.bit_rate);
    }
  });
  
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
      // save bitrate
      obj[BITRATE_KEY] = $bitratePicker.val();
      storage.set(obj);

      onComplete({
        port: $portPicker.val(),
        bitrate: $bitratePicker.val()
      });
    }
  });
};

