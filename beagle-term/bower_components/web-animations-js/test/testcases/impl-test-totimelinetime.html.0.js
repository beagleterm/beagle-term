
"use strict";

var timelineOne = new AnimationTimeline(_WebAnimationsTestingUtilities._constructorToken);
timelineOne._startTime = 3;
var timelineTwo = new AnimationTimeline(_WebAnimationsTestingUtilities._constructorToken);
timelineTwo._startTime = 42;

test(function() {
  var startTimeOne = timelineOne._startTime;
  var startTimeTwo = timelineTwo._startTime;
  var otherTime = timelineTwo.currentTime;
  var timelineOneTime = timelineOne.toTimelineTime(otherTime, timelineTwo);
  var timelineOneTimeExpected = otherTime + startTimeTwo - startTimeOne;
  
  assert_approx_equals(timelineOneTime, timelineOneTimeExpected, 0.00001, 'Unexpected result with fake start times.');
}, 'toTimelineTime with fake start times');

