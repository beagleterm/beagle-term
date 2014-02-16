chrome.app.runtime.onLaunched.addListener(function() {
  new BeagleWindow();
});

var BeagleWindow = function() {
  chrome.app.window.create(
    'beagle.html',
    {
      bounds: {
        width: 1024,
        height: 768
      }
    },
    function(win) {
      // TODO(sunglim) : From M33, below code doesn't necessary.
      win.onClosed.addListener(function() {
        serial_lib.closeSerial(function() {
          console.log("close successfully");
        });
      });
    }
  );
}
