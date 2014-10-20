
"use strict";

var effect = [{left: "100px"}, {left: "200px"}];

var testPauseUnpause = function(name, player) {
  player.currentTime = 5.0;
  player.paused = true;
  test(function() {assert_equals(player.currentTime,  5.0)},
       name + " AnimationPlayer.currentTime should be unaffected by pausing");
  player.paused = false;
  test(function() {assert_equals(player.currentTime,  5.0)},
       name + " AnimationPlayer.currentTime should be unaffected by unpausing");
};

// Test that an AnimationPlayer's currentTime is correct after pausing and
// unpausing, with a zero startTime.
addEventListener("load", function() {
  testPauseUnpause("zero starttime,", document.timeline.play(new Animation(
      document.getElementById("anim"), effect, 1.0)));

});

// Test that an AnimationPlayer's currentTime is correct after pausing and
// unpausing, with a non-zero startTime.
addEventListener("load", function() {
  var player = document.timeline.play(new Animation(
      document.getElementById("anim"), effect, 1.0));
  test(function() {assert_equals(player.startTime > 0,  true)},
       "AnimationPlayer has started");
  testPauseUnpause("non-zero starttime,", player);
});

// TODO: Test pausing and unpausing with a forced currentTime while the
// Timeline is not started. See
// https://github.com/web-animations/web-animations-js/issues/167

// FIXME! - Make this actually test something...
test(function() { assert_true(true); }, "Dummy test");

