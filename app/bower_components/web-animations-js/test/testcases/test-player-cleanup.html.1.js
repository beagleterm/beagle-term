
"use strict";


document.timeline.play(new Animation(null, {},
	{duration: 1, fill: 'forwards'}));
document.timeline.play(new Animation(null, {},
	{duration: 1, fill: 'none'}));
var player = document.timeline.play(new Animation(anim,
	[{backgroundColor: 'red'}, {backgroundColor: 'white'}],
	{duration: 1, fill: 'none'}));

timing_test(function() {
	at(0.5, function() {
		assert_equals(document.timeline.getCurrentPlayers().length, 3,
			"All animations current");
		assert_equals(_WebAnimationsTestingUtilities._knownPlayers.length, 3,
			"All animations known");
	});
	at(2, function() {
		assert_equals(document.timeline.getCurrentPlayers().length, 0,
			"No animations current");
		assert_equals(_WebAnimationsTestingUtilities._knownPlayers.length, 1,
			"Only animations with forward fill known");
	});
	at(3, function() {
		player.currentTime = 0;
		assert_equals(document.timeline.getCurrentPlayers().length, 1,
			"Only restarted animation current");
		assert_equals(_WebAnimationsTestingUtilities._knownPlayers.length, 2,
			"Restarted and forward filling animations known");
		assert_styles('#anim', [{"backgroundColor": 'rgb(255, 0, 0)'}],
			"takes effect immediately");
	});
	at(3.5, function() {
		assert_equals(document.timeline.getCurrentPlayers().length, 1,
			"Only restarted animation current");
		assert_equals(_WebAnimationsTestingUtilities._knownPlayers.length, 2,
			"Restarted and forward filling animations known");
	})

	at(5, function() {
		player.source.timing.duration = 4;
		assert_equals(document.timeline.getCurrentPlayers().length, 1,
			"Only restarted animation current");
		assert_equals(_WebAnimationsTestingUtilities._knownPlayers.length, 2,
			"Restarted and forward filling animations known");
		assert_styles('#anim', [{"backgroundColor": 'rgb(255, 64, 64)'}],
			"takes effect immediately");
	});
});
