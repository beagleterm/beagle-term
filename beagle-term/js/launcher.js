chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('html/beagle.html', {
    width: 1024,
    height: 768
  });
})

chrome.runtime.onSuspend.addListener(function() { 
  console.log("called at chrome.runtime.onSuspend.addListener");
    serial_lib.closeSerial(function(){
      console.log("close successfully");
    })
});
