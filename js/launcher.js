chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('html/beagle.html', {
    width: 1024,
    height: 768
  });
})