
"use strict";

var anim = new Animation(document.getElementById("anim"), {left: "100px"},
    {iterations: 3.0});
var animationGroup = new AnimationGroup();
var animationSequence = new AnimationSequence();

// Should use intrinsic duration if Timing.duration is undefined.
// Animation
test(function() {assert_equals(anim.duration,  0.0)},
     "Animation duration should use intrinsic value");
anim.timing.duration = 1.0;
test(function() {assert_equals(anim.duration,  1.0)},
     "Animation duration should use specified value");
// AnimationGroup
test(function() {assert_equals(animationGroup.duration,  0.0)},
     "AnimationGroup duration should use intrinsic value");
animationGroup.append(anim);
test(function() {assert_equals(animationGroup.duration,  3.0)},
     "AnimationGroup duration should be derived from child");
animationGroup.timing.duration = 2.0;
test(function() {assert_equals(animationGroup.duration,  2.0)},
     "AnimationGroup duration should use specified value");
// AnimationSequence
test(function() {assert_equals(animationSequence.duration,  0.0)},
     "AnimationSequence duration should use intrinsic value");
animationSequence.append(anim);
test(function() {assert_equals(animationSequence.duration,  3.0)},
     "AnimationSequence duration should be derived from child");
animationSequence.timing.duration = 4.0;
test(function() {assert_equals(animationSequence.duration,  4.0)},
     "AnimationSequence duration should use specified value");

test(function() {
  assert_throws(new TypeError(), function() {
    anim.duration = 5.0;
  });
  assert_equals(anim.duration,  1.0);
}, "Animation.duration should be read-only");

anim.timing.duration = 14.0;
test(function() {assert_equals(anim.activeDuration,  42.0)},
     "activeDuration should always reflect TimedItem.duration");

