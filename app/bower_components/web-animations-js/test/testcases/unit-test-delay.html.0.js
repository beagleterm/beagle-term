
"use strict";

var anim1 = new Animation(document.getElementById("anim"), {left: "100px"},
    {iterations: 3.0, duration: 1.0});
var anim2 = new Animation(document.getElementById("anim"), {left: "100px"},
    {duration: 2.0});
var animationGroup = new AnimationGroup([anim1, anim2]);

function expectDuration(anim, duration, error) {
  test(function() {assert_equals(anim.activeDuration, duration)}, error);
}

function expectEndTime(anim, endTime, error) {
  test(function() {assert_equals(anim.endTime, endTime)}, error);
}

expectDuration(anim1, 3.0, "Animation 1 duration should match specified value");
expectDuration(anim2, 2.0, "Animation 2 duration should match specified value");
expectDuration(animationGroup, 3.0,
    "AnimationGroup duration should be max of childrens' end times");
anim1.timing.delay = 2.0;
expectDuration(anim1, 3.0, "Animation 1 duration should not include delay");
expectEndTime(anim1, 5.0, "Animation 1 end time should include delay");
expectDuration(animationGroup, 5.0,
    "AnimationGroup duration should still be max of childrens' end times");
anim2.timing.endDelay = 4.0;
expectDuration(anim2, 2.0, "Animation 2 duration should not include endDelay");
expectEndTime(anim2, 6.0, "Animation 2 end time should include endDelay");
expectDuration(animationGroup, 6.0,
    "AnimationGroup duration should STILL be max of childrens' end times");

var animationSequence = new AnimationSequence([anim1, anim2]);
expectDuration(animationSequence, 11.0,
    "AnimationSequence duration should be sum of childrens' total durations");
expectEndTime(anim2, 11.0, "Animation 2 end time should include Animation 1");
anim1.timing.delay = 4.0;
expectEndTime(anim2, 13.0,
    "Animation 2 end time should be updated by changes to animation 1 delay");
anim1.timing.endDelay = 3.0;
expectDuration(anim1, 3.0, "Animation 1 duration should not include endDelay");
expectEndTime(anim1, 10.0, "Animation 1 end time should include endDelay");
expectEndTime(anim2, 16.0, "Animation 2 end time should include Animation 1 endDelay");
expectDuration(animationSequence, 16.0,
    "AnimationSequence duration should still be sum of childrens' total durations");
