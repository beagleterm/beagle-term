
"use strict";

var animationGroup = new AnimationGroup();
var anim = new Animation(document.getElementById("anim"), {left: "100px"},
    {iterations: 3.0});
var anim1 = new Animation(document.getElementById("anim"), {top: "100px"},
    {iterations: 3.0});
var anim2 = new Animation(document.getElementById("anim"), {width: "100px"},
    {iterations: 3.0});
var anim3 = new Animation(document.getElementById("anim"), {height: "100px"},
    {iterations: 3.0});

test(function() {assert_equals(anim.previousSibling, null)},
     "Single animation should have no previous sibling");

test(function() {assert_equals(anim.nextSibling, null)},
     "Single animation should have no next sibling");

animationGroup.append(anim);

test(function() {assert_equals(anim.previousSibling, null)},
     "Single animation in a animationGroup should have no previous sibling");

test(function() {assert_equals(anim.nextSibling, null)},
     "Single animation in a animationGroup should have no next sibling");

animationGroup.prepend(anim1);

test(function() {assert_equals(anim.previousSibling, anim1)},
     "Animation should have a previous sibling when there is one");

test(function() {assert_equals(anim.nextSibling, null)},
     "Animation should have no next sibling when there is none");

animationGroup.append(anim2);

test(function() {assert_equals(anim.previousSibling, anim1)},
     "Animation should have a previous sibling when there is one");

test(function() {assert_equals(anim.nextSibling, anim2)},
     "Animation should have a next sibling when there is one");

animationGroup.prepend(anim3);

test(function() {assert_equals(anim.previousSibling, anim1)},
     "Animation should have the correct previous sibling when there is more than one");

test(function() {assert_equals(anim.nextSibling, anim2)},
     "Animation should have a next sibling when there is one");
anim1.remove();

test(function() {assert_equals(anim.previousSibling, anim3)},
     "Animation should have the correct previous sibling when the old one is removed");

test(function() {assert_equals(anim.nextSibling, anim2)},
     "Animation should have a next sibling when there is one");

anim3.remove();
animationGroup.append(anim3);

test(function() {assert_equals(anim.previousSibling, null)},
     "Animation should have the no previous sibling when there is none");

test(function() {assert_equals(anim.nextSibling, anim2)},
     "Animation should have a next sibling when there is more than one");

anim2.remove();

test(function() {assert_equals(anim.previousSibling, null)},
     "Animation should have the no previous sibling when there is none");

test(function() {assert_equals(anim.nextSibling, anim3)},
     "Animation should have the correct next sibling when the old one is removed");

anim.before(anim1);

test(function() {assert_equals(anim.previousSibling, anim1)},
     "Animation should have the correct previous sibling when one is added");

test(function() {assert_equals(anim.nextSibling, anim3)},
     "Animation should have the correct next sibling when the old one is removed");

anim.after(anim2);

test(function() {assert_equals(anim.previousSibling, anim1)},
     "Animation should have a previous sibling when there is one");

test(function() {assert_equals(anim.nextSibling, anim2)},
     "Animation should have the correct next sibling when a new one is added");

