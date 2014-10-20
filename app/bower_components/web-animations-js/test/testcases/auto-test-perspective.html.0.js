
'use strict';
var perspectiveTestCases = [
  '150px',
  '1000px',
  'none',
  '4px',
];
perspectiveTestCases.forEach(function(testCase) {
  var test = createBoxedItem('test', testCase);
  test.animate({perspective: testCase}, {duration: 2 * 1000, fill: 'forwards'});
  testContainer.appendChild(test);

  var expectation = createBoxedItem('expectation', testCase);
  expectation.style.perspective = expectation.style.webkitPerspective = testCase;
  expectationContainer.appendChild(expectation);
});

function createBoxedItem(type, text) {
  var box = document.createElement('div');
  box.classList.add('box', type);
  box.textContent = text;
  var item = document.createElement('div');
  item.classList.add('item');
  box.appendChild(item);
  return box;
}
