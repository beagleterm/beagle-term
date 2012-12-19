'use strict';

var MessageDialog = function() {};

MessageDialog.show = function(message) {
  lib.ensureRuntimeDependencies();
  $('a[rel*=leanModal]').leanModal({closeButton: '#message-ok'});
  $('#message-content').text(message);
  
  // Show error popup
  $('#message-dialog-trigger').click();
};
