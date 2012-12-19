'use strict';

var ConnectDialog = function() {};

ConnectDialog.show = function(onComplete) {
  lib.ensureRuntimeDependencies();
  $('a[rel*=leanModal]').leanModal({closeButton: '#connect'});
  
  var port = null;
  var bitrate = 9600;
  var $portPicker = $('#port-picker');
  var $bitratePicker = $('#bitrate-picker');

  // Build port picker
  serial_lib.getPorts(function(ports) {
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

  $('#connect').click(function() {
    if (onComplete) {
      onComplete({
        port: $portPicker.val(),
        bitrate: $bitratePicker.val()
      });
    }
  });
};
