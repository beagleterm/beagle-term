
'use strict';

var testCases = [
  'center',
  'left',
  'right',
  'top',
  'bottom',
  '25px',
  'left top',
  '10% 50px',
  '10% 50px 100px',
  'right bottom 100px',
  'right calc(120% - 100px)',
  'right calc(120% - 100px) -200px',
];

function createBox(type) {
  var element = document.createElement('div');
  element.classList.add('box', type);
  return element;
}

testCases.forEach(function(testCase) {
  var expectation = createBox('expectation')
  expectation.style.transformOrigin = expectation.style.webkitTransformOrigin = testCase;
  expectation.textContent = testCase;
  expectationContainer.appendChild(expectation);

  var test = createBox('test')
  test.animate({transformOrigin: testCase}, {duration: 2 * 1000, fill: 'forwards'});
  test.textContent = testCase;
  testContainer.appendChild(test);
});
