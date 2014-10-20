
  "use strict";
  var timing = {duration: 0.2, fill: 'forwards'};
  var across = new Animation(document.querySelector("#a"), {left: "450px"}, timing);
  var pause1 = new Animation(null, {left: "500px"}, timing);
  var pause2 = new Animation(null, null, timing);
  var down = new Animation(document.querySelector("#a"), {top: "450px"}, timing);
  var combo = new AnimationSequence([across, pause1, pause2, down]);
  document.timeline.play(combo);

  timing_test(function() {
    at(0.4, function() {
      assert_equals(getComputedStyle(a).getPropertyValue("left"), "450px")
      assert_equals(getComputedStyle(a).getPropertyValue("top"), "0px")
    });
  }, "AnimationPlayer should do nothing for the duration of animations with null targets.")

  timing_test(function() {
    at(0.8, function() {
      assert_equals(getComputedStyle(a).getPropertyValue("left"), "450px")
      assert_equals(getComputedStyle(a).getPropertyValue("top"), "450px")
    });
  },
  "AnimationPlayer should do nothing for duration of animations with null targets, " +
  "then continue with animations with real targets.") 
