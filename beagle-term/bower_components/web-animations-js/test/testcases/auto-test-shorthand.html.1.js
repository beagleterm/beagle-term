
"use strict";

var testCases = {
  background: 'url(background.png) 50% 25% repeat-y green',
  border: 'green solid 4px',
  borderColor: 'lime lightgreen darkgreen green',
  borderLeft: 'green solid 4px',
  borderRight: 'green solid 4px',
  borderTop: 'green solid 4px',
  borderBottom: 'green solid 4px',
  borderRadius: '10px 20px 10% 50%',
  borderWidth: 'thin medium thick 10px',
  font: 'italic bold 20pt / 200% serif',
  margin: '5px 10px 15px 20px',
  outline: 'green solid 5px',
  padding: '5px 10px 15px 20px',
};

var container = document.querySelector('#container');

for (var shorthand in testCases) {
  var p = document.createElement('p');
  var value = testCases[shorthand];
  p.appendChild(document.createTextNode(shorthand));
  p.appendChild(document.createElement('br'));
  var refDiv = document.createElement('div');
  refDiv.id = shorthand;
  refDiv.style[shorthand] = value;
  refDiv.className = 'ref';
  refDiv.appendChild(document.createTextNode('Ref'));
  p.appendChild(refDiv);
  var testDiv = document.createElement('div');
  testDiv.id = shorthand;
  testDiv.className = 'test';
  testDiv.appendChild(document.createTextNode('Test'));
  p.appendChild(testDiv);
  container.appendChild(p);

  var keyframe = {};
  keyframe[shorthand] = value;
  document.timeline.play(new Animation(testDiv, [keyframe], {duration: 2 * 1000, fill: 'forwards'}));
}

