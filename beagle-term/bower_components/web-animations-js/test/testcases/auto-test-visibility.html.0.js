
"use strict";
// Create the elements
var states = {'visible':1, 'hidden':1, 'collapse':1};
for (var start in states) {
  for (var end in states) {
    var frames = [start, end];
    var testContainer = document.createElement('div');
    testContainer.textContent = 'visibility: ' + JSON.stringify(frames);
    document.body.appendChild(testContainer);
    if (end == 'visible') {
      var expectation = document.createElement('div');
      expectation.classList.add('expectation');
      testContainer.appendChild(expectation);
    }
    var testElement = document.createElement('div');
    testElement.classList.add('test');
    testElement.id = start + "_" + end
    if (end == 'hidden' || end == 'collapse') {
      testElement.classList.add('red');
    }
    testContainer.appendChild(testElement);
  }
}

