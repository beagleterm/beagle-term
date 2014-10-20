
"use strict";

var animFunc = [{left: "100px"}, {left: "200px"}];

// Test that the animation interval uses inclusive start and end bounds.
var elem1 = document.getElementById("anim1");
var player1 =
  document.timeline.play(new Animation(elem1, animFunc, {duration: 1.0, fill: 'forwards'}));

timing_test(function() {
    at(0, function() { assert_equals(getComputedStyle(elem1).left, "100px") });
  },
  "Start bound should be inclusive");

timing_test(function() {
    at(1.0, function() { assert_equals(getComputedStyle(elem1).left, "200px") });
  },
  "End bound should be inclusive");

// Test that delay is applied correctly.
var elem2 = document.getElementById("anim2");
var player2 = document.timeline.play(
  new Animation(elem2, animFunc, {duration: 1.0, delay: 1.0, fill: 'forwards'}));

timing_test(function() {
    at(0, function() { assert_equals(getComputedStyle(elem2).left, "0px"); });
  },
  "Start bound should include delay");

timing_test(function() {
    at(1.0, function() { assert_equals(getComputedStyle(elem2).left, "100px"); });
  },
  "Start bound with delay should be inclusive");

timing_test(function() {
    at(2.0, function() { assert_equals(getComputedStyle(elem2).left, "200px"); });
  },
  "End bound with delay should be inclusive");

