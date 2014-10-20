
'use strict';

var target = document.querySelector('#target');

document.timeline.play(new Animation(target, {left: '100px', composite: 'add'}, {duration: 1 * 1000, iterations: 2, direction: 'alternate'}));

at(0.5 * 1000, function() {
  assert_equals(0, target.style.length);
  assert_equals('', target.style.left);
});

testharness_timeline.schedule(function() {
  target.style.left = '50px';
  assert_styles(target, {left: '150px'}, 'getComputedStyle() should return correct value after setting inline style.');
}, 1000);

at(1.5 * 1000, function() {
  assert_equals(1, target.style.length);
  assert_equals('50px', target.style.left);
});

testharness_timeline.schedule(function() {
  target.style.cssText = 'left: 100px; background-color: green;';
}, 2500);

at(3 * 1000, function() {
  assert_equals(2, target.style.length);
  assert_equals('100px', target.style.left);
  assert_not_equals('', target.style.backgroundColor);
});

