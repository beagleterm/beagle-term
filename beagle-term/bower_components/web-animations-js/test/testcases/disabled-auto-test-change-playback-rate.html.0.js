
"use strict";

var a1 = new Animation(document.querySelector("#a"),
    [{left: "0px"}, {left: "500px"}],
    {duration: 10 * 1000, direction: 'alternating', iterations: Infinity});
var player1 = document.timeline.play(a1);

var a2 = new Animation(undefined,
    function(timeFraction) {
      var playbackRate = 0.01 + 10 * timeFraction;
      player1.playbackRate  = playbackRate
      player2.playbackRate = playbackRate;
      document.querySelector("#a").textContent = playbackRate;
    },
    a1.timing.clone());
var player2 = document.timeline.play(a2);

