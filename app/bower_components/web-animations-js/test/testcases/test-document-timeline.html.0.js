
"use strict";

// Test that document.timeline.currentTime is read-only.
test(function() {
  assert_throws(new TypeError(), function() {
    document.timeline.currentTime = 12345;
  });
  assert_not_equals(document.timeline.currentTime, 12345);
}, "document.timeline.currentTime should be read-only");

/*

This is wrong according to the spec, timing actually continues to move forward
even while Javascript is running.

// Test that document.timeline.currentTime is constant within a JavaScript
// callstack.
timing_test(function() {
    at(0.0, function() {assert_equals(document.timeline.currentTime, 0.0)});
  }, "document.timeline.currentTime time should be constant in JavaScript callstack");
*/

// Test that document.timeline.currentTime is non-null in an onload handler
// when using performance timing. Note that this assumes that web-animations.js
// is loaded before document load time.
var loadtest = async_test("document.timeline.currentTime should be non-null in an onload handler");
addEventListener("load", function() {
  loadtest.step(function() {assert_not_equals(document.timeline.currentTime,  null)});
  loadtest.done();
});

