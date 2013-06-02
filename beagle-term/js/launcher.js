chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('html/beagle.html', {
        'bounds': {
            width: 1024,
            height: 768
        }
    }, function(win) {
        win.onClosed.addListener(function() {
            console.log("called at onClosed");
            serial_lib.closeSerial(function() {
                console.log("close successfully");
            });
        });
    });
})
