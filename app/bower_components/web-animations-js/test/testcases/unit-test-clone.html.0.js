
"use strict";

var elem = document.getElementById("anim");
var animFunc = {left: "100px"};

// Animation
var anim = new Animation(elem, animFunc, 1.0);
var clone = anim.clone();
test(function() {assert_true(clone instanceof Animation)},
     "Clone should be an Animation");
test(function() {assert_equals(clone.timing.duration, 1.0)},
     "Clone should take Timing.duration");
test(function() {assert_equals(clone.target, elem)},
     "Clone should take target");

// AnimationGroup
var animationGroup = new AnimationGroup([anim, clone], 4.0);
var animationGroupClone = animationGroup.clone();
test(function() {assert_true(animationGroupClone instanceof AnimationGroup, true)},
     "AnimationGroup clone should be a AnimationGroup");
test(function() {assert_equals(animationGroupClone.timing.duration, 4.0)},
     "AnimationGroup clone should take Timing.duration");
test(function() {assert_equals(animationGroupClone.children.length, 2)},
     "AnimationGroup clone should clone children");
test(function() {assert_not_equals(animationGroupClone.children[0], anim)},
     "AnimationGroup clone should clone first child");
test(function() {assert_equals(animationGroupClone.children[0].duration, 1.0)},
     "AnimationGroup clone should clone first child's duration");
test(function() {assert_not_equals(animationGroupClone.children[1], clone)},
     "AnimationGroup clone should clone second child");
test(function() {assert_equals(animationGroupClone.children[1].duration, 1.0)},
     "AnimationGroup clone should clone second child's duration");

// AnimationSequence
var animationSequence = new AnimationSequence([anim, clone], 6.0);
var animationSequenceClone = animationSequence.clone();
test(function() {assert_true(animationSequenceClone instanceof AnimationSequence)},
     "AnimationSequence clone should be a AnimationSequence");
test(function() {assert_equals(animationSequenceClone.timing.duration, 6.0)},
     "AnimationSequence clone should take Timing.duration");
test(function() {assert_equals(animationSequenceClone.children.length, 2)},
     "AnimationSequence clone should clone children");
test(function() {assert_not_equals(animationSequenceClone.children[0], anim)},
     "AnimationSequence clone should clone first child");
test(function() {assert_equals(animationSequenceClone.children[0].duration, 1.0)},
     "AnimationSequence clone should clone first child's duration");
test(function() {assert_not_equals(animationSequenceClone.children[1], clone)},
     "AnimationSequence clone should clone second child");
test(function() {assert_equals(animationSequenceClone.children[1].duration, 1.0)},
     "AnimationSequence clone should clone second child's duration");

// Child
var childClone = anim.clone();
test(function() {assert_equals(anim.parent, animationSequence)},
     "Child clone should not equal animationSequence");
test(function() {assert_equals(childClone.parent, null)},
     "Child clone should not take parent");

