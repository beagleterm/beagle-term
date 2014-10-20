
"use strict";
var player = document.timeline.play(new Animation(
    document.getElementById("anim"), [{left: "100px"}, {left: "200px"}], 1.0));

// Test that repeatedly setting AnimationPlayer.paused to true does not affect the
// AnimationPlayer's currentTime.
timing_test(function() {
    at(0.1, function() {
      player.pause();
      assert_equals(player.currentTime, 0.1);
    });
  },
  "AnimationPlayer.currentTime should be " +
  "unaffected by repeatedly setting AnimationPlayer.paused to true");

// Test that repeatedly setting AnimationPlayer.paused to false has no effect.
timing_test(function() {
    at(0.2, function() {
      player.play();
      assert_equals(player.currentTime, 0.1);
    });
  },
  "AnimationPlayer.currentTime should be " +
  "unaffected by repeatedly setting AnimationPlayer.paused to false");

