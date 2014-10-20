
"use strict";

var globalVar = 0;
var incGlobalVar = function() {
  globalVar += 1;
}
var failed = false;

for (var i = 0; i < 100; i++) {
  document.timeline.play(new Animation(null, incGlobalVar, 1));
}

document.timeline.play(new Animation(null, function() {
  if (globalVar !== 100) {
    failed = true;
  }
  globalVar = 0;
}, 1));

// ensure at least one point is sampled
at(0, function() { });

timing_test(function() {
  at(1, function() { assert_true(!failed); }); 
  },
  "the 101st animation should always come 101st");

