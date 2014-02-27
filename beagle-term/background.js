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
    }
  );
}
