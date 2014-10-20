var input_output;
var self;

// utility. extract to another file.
var ab2str=function(buf) {
  var bufView=new Uint8Array(buf);
  var unis=[];
  for (var i=0; i<bufView.length; i++) {
    unis.push(bufView[i]);
  }
  return String.fromCharCode.apply(null, unis);
};

var str2ab = function(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

var Crosh = function(argv) {
  this.argv_ = argv;
  this.io = null;
  this.keyboard_ = null;
  this.pid_ = -1;
  this.connectionId = -1;
  this.portInfo_ = null;
  this.run = function() {
    this.io = this.argv_.io.push();

    this.io.onVTKeystroke = this.sendString_.bind(this, true /* fromKeyboard */);
    this.io.sendString = this.sendString_.bind(this, false /* fromKeyboard */);
    this.io.println("Beagle Term, still beta. https://github.com/beagleterm/beagle-term");
    input_output = this.io;
    self = this;
    chrome.serial.getDevices(function(ports) {
      var eligiblePorts = ports;

      if (eligiblePorts.length > 0) {
        eligiblePorts.forEach(function(portNames) {
          var portPicker = document.querySelector('#port-picker');
          var portName = portNames.path;
          portPicker.innerHTML = portPicker.innerHTML + '<option value="' +
                                 portName +'">' + portName + '</option>';
        });
      }
    });
  };
  this.sendString_ = function(fromKeyboard, string) {
    console.log('nike' + string);
    chrome.serial.send(self.connectionId, str2ab(string), function () { });
  };
  this.exit = function(code) {
  };
};

window.onload = function() {
  hterm.defaultStorage = new lib.Storage.Chrome(chrome.storage.sync);
  var t = new hterm.Terminal("opt_profileName");
  t.decorate(document.querySelector('#terminal'));

  t.onTerminalReady = function() {
    t.runCommandClass(Crosh, document.location.hash.substr(1));
    return true;
  };
};

window.addEventListener('core-overlay-open', function(e) {
  // If |input_output| is null, it means hterm is not ready yet.
  if (!input_output)
    return;
  var nike = document.querySelector('#connect_dialog');
  // TODO(sunglim): Need better method to catch dialog is closed.
  if (!nike.opened) {
    var elem = document.querySelector('#port-picker');
    var port = elem.options[elem.selectedIndex].value;
    var bitelem = document.querySelector('#bitrate-picker');
    var bitrate = Number(bitelem.options[bitelem.selectedIndex].value);
    chrome.serial.connect(port, {'bitrate': bitrate}, function(openInfo) {
      input_output.println('Device found ' + port + ' connection Id ' + openInfo.connectionId);
      self.connectionId = openInfo.connectionId;
      AddConnectedSerialId(openInfo.connectionId);
      chrome.serial.onReceive.addListener(function(info) {
        if (info && info.data) {
          input_output.print(ab2str(info.data));
        }
      });
    });
  }
});
