
"use strict";

var PacedTimingFunction = _WebAnimationsTestingUtilities._pacedTimingFunction;

var effect =
    new MotionPathEffect(document.querySelector('#path').pathSegList);

// Line has 5 segments of lengths 10, 20, 30, 40 and 50, giving a total length
// of 150.
var fullRangeTimingFunction = new PacedTimingFunction(effect);
fullRangeTimingFunction.setRange({min: 0, max: 1});

// Partial range runs from midpoint of first segment ot midpoint of last
// segment, giving total length of 5 + 20 + 30 + 40 + 25 = 120.
var partialRangeTimingFunction = new PacedTimingFunction(effect);
partialRangeTimingFunction.setRange({min: 0.1, max: 0.9});

test(function() {
  assert_equals(fullRangeTimingFunction.scaleTime(0.5), (3 + 15/40) / 5);
}, 'Full range between bounds');

test(function() {
  assert_equals(fullRangeTimingFunction.scaleTime(0), 0);
}, 'Full range lower bound');

test(function() {
  assert_equals(fullRangeTimingFunction.scaleTime(1), 1);
}, 'Full range upper bound');

test(function() {
  assert_equals(fullRangeTimingFunction.scaleTime(-0.5), 0);
}, 'Full range below lower bound');

test(function() {
  assert_equals(fullRangeTimingFunction.scaleTime(1.5), 1);
}, 'Full range above upper bound');

test(function() {
  assert_equals(partialRangeTimingFunction.scaleTime(0.5), (3 + 5/40) / 5);
}, 'Partial range between bounds');

test(function() {
  assert_equals(partialRangeTimingFunction.scaleTime(0), 0.1);
}, 'Partial range lower bound');

test(function() {
  assert_equals(partialRangeTimingFunction.scaleTime(1), 0.9);
}, 'Partial range upper bound');

test(function() {
  assert_equals(partialRangeTimingFunction.scaleTime(-0.5), 0.1);
}, 'Partial range below lower bound');

test(function() {
  assert_equals(partialRangeTimingFunction.scaleTime(1.5), 0.9);
}, 'Partial range above upper bound');

