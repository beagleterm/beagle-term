
"use strict";
var testGroups = [
  [
    'matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)',
    'matrix(0.7, 0.7, -0.7, 0.7, 10, 20)',
    'matrix3d(0,0,-1,0, 0,1,0,0, 1,0,0,0, 0,0,0,1)',
  ], [
    'skew(20deg, 30deg)',
    'skewX(40deg)',
    'skewY(30deg)',
  ], [
    'scale(1.5, 2)',
    'scaleX(2)',
    'scaleY(1.5)',
    'scaleZ(2) translateZ(4px)',
  ], [
    'rotate(60deg)',
    'rotateX(70deg)',
    'rotateY(80deg)',
    'rotateZ(70deg)',
    'rotate3d(1, 1, 1, 60deg)',
  ], [
    'translate(10px, 20px)',
    'translateX(10px)',
    'translateY(20px)',
    'translateZ(30px)',
    'translate3d(10px, 20px, 40px)',
  ], [
    'translate(100px)',
    'translate(100px) rotate(20deg)',
    'translate(100px) rotate(20deg) matrix(0.7, 0.7, -0.7, 0.7, 0, 0)',
    'translate(100px) rotate(20deg) scale(0.5)',
  ]
];

var animations = [];
var style = document.createElement('style');
var count = 0;
var showExpectations = inExploreMode();
var expectationStarters = [];

function addAnimationTest(from, to) {
  var testElement = document.createElement('div');
  testElement.classList.add('box', 'test');
  testContainer.appendChild(testElement);
  testElement.textContent = from + '\n' + to;
  animations.push(new Animation(testElement, [
      {transform: from},
      {transform: to},
    ], {
      duration: 1 * 1000,
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out',
    }));

  if (!showExpectations) {
    return;
  }
  var expectationElement = document.createElement('div');
  expectationElement.classList.add('box', 'expectation');
  expectationElement.textContent = from + '\n' + to;
  var currentCount = count;
  expectationStarters.push(function() {
    expectationElement.classList.add('animation' + currentCount);
  });
  expectationContainer.appendChild(expectationElement);
  var keyframes = ' animation' + count + '{' +
      'from{-webkit-transform:' + from + ';transform:' + from +';}' +
      'to{-webkit-transform:' + to + ';transform:' + to +';}}';
  var animation = 'animation' + count + ' 1s alternate infinite ease-in-out';
  style.textContent += '@-webkit-keyframes' + keyframes + '\n';
  style.textContent += '@keyframes' + keyframes + '\n';
  style.textContent += '.animation' + count +'{-webkit-animation:' + animation + ';animation:' + animation + ';}\n';
  count++;
}

function addBreak() {
  testContainer.appendChild(document.createElement('hr'));
  if (showExpectations) {
    expectationContainer.appendChild(document.createElement('hr'));
  }
}

function addTestGroup(tests) {
  tests.forEach(function(transform) {
    addAnimationTest('none', transform);
  });
  tests.forEach(function(transform, i) {
    addAnimationTest(transform, tests[(i + 1) % tests.length]);
  });
  addBreak();
}

testGroups.forEach(addTestGroup);

if (showExpectations) {
  expectationContainer.appendChild(style);
  var startExpectations = function() {
    expectationStarters.forEach(function(f) {f();});
  };
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    requestAnimationFrame(startExpectations);
  } else {
    startExpectations();
  }
}
// TODO: Make infinite duration groups work.
animations.forEach(function(animation) {document.timeline.play(animation);});

spacer.style.height = testContainer.clientHeight + 'px';
