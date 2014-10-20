
"use strict";

var animFunc = {left: "100px"};
var anim1 = new Animation(document.getElementById("anim1"), animFunc, {duration: 1.0, fill: 'forwards'});
var player1 = document.timeline.play(anim1);

var anim2 = new Animation(document.getElementById("anim2"), animFunc, {duration: 1.0, fill: 'forwards'});
var player2 = document.timeline.play(anim2);

var anim3 = new Animation(document.getElementById("anim3"), animFunc, {duration: 1.0, fill: 'forwards'});
var player3 = document.timeline.play(anim3);

// Check that once an animation is completed, creating a new AnimationPlayer restarts it.
timing_test(function() {
    at(1.0, function() {
      assert_styles('#anim1', {'left': '100px'});
      document.timeline.play(anim1);
    });
  }, "Animation 1 should be in end state");

timing_test(function() {
    at(1.5, function() {assert_styles('#anim1', {'left': '50px'})});
  }, "Animation 1 should have been restarted");

timing_test(function() {
    at(2.0, function() {assert_styles('#anim1', {'left': '100px'})});
  }, "Animation 1 should be in end state a second time");

// Setting AnimationPlayer.currentTime = 0 restarts it.
timing_test(function() {
    at(0.5, function() {
      assert_styles("#anim2", {'left': '50px'});
      player2.currentTime = 0.0;
    });
  }, "Animation 2 should be in the middle of running");

timing_test(function() {
    at(0.75, function() {
      assert_styles('#anim2', {'left': '25px'});
    });
  }, "Animation 2 should have been restarted");

timing_test(function() {
    at(1.0, function() {
      assert_styles('#anim2', {'left': '50px'});
    });
  }, "Animation 2 should have been restarted, 2");

timing_test(function() {
    at(1.5, function() {
      assert_styles('#anim2', {'left': '100px'});
    });
  }, "Animation 2 should be in end state a second time");

// Even when animation is completed, setting AnimationPlayer.currentTime = 0
// restarts it.
timing_test(function() {
    at(1.0, function() {
      assert_styles("#anim3", {'left': '100px'});
      player3.currentTime = 0.0;
    });
  }, "Animation 3 should be in end state");

timing_test(function() {
    at(1.5, function() {
      assert_styles('#anim3', {'left': '50px'});
    });
  }, "Animation 3 should have been restarted");

timing_test(function() {    at(2.0, function() {
      assert_styles('#anim3', {'left': '100px'});
    });
  }, "Animation 3 should be in end state a second time");


// Check that TimedItem.localTime is read-only.
var anim4 = new Animation(document.getElementById("anim4"), animFunc, 1.0);
document.timeline.play(anim4);
test(function() {
    assert_throws(new TypeError(), function() {anim4.localTime = 0;});
    assert_equals(anim4.localTime,  null);
  }, "TimedItem.localTime should be read-only");

