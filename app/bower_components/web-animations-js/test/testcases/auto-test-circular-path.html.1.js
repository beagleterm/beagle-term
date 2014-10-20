
"use strict";

var options = {autoRotate: 'auto-rotate', iterationComposite: 'accumulate'};
var animFunc = new MotionPathEffect(
    document.querySelector('#path').pathSegList, options);
document.timeline.play(new Animation(document.querySelector("#anim"),
    animFunc, {duration: 7 * 1000, iterations: 3}));

