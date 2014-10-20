
'use strict';
var perspectiveOrignTestCases = [
  '0 0',
  'left',
  'right',
  'top',
  'bottom',
  'center',
  '0 0',
  '80px 80px',
  '20% 60%',
  'calc(25px - 25%) calc(25px + 75%)',
];
perspectiveOrignTestCases.forEach(function(testCase) {
  var test = createBoxedItem('test', testCase);
  test.animate({perspectiveOrigin: testCase}, {duration: 2 * 1000, fill: 'forwards'});
  testContainer.appendChild(test);

  var expectation = createBoxedItem('expectation', testCase);
  expectation.style.perspectiveOrigin = expectation.style.webkitPerspectiveOrigin = testCase;
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
