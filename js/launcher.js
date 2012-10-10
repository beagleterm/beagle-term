chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('html/beagle.html', {
    top: 0,
    left: 0,
    width: 1024,
    height: 768
  });
})