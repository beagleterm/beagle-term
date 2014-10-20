
"use strict";

var target = document.getElementById("anim");

test(function() { new Animation(target, null, 1.0); },
    "Creating an animation with a null effect should not cause an exception");

test(function() {
  assert_equals(new Animation(target, null, 1.0).effect, null);
}, "Animation.effect should be null if effect is null");

test(function() {
  assert_equals(new Animation(target, null, 1.0).clone().effect, null);
}, "Cloning an animation with a null effect should yield a null effect");

test(function() { document.timeline.play(new Animation(target, null, 1.0)); },
    "Playing an animation with a null effect should not cause an exception");

