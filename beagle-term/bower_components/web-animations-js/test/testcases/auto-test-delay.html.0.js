
"use strict";

var anim = new Animation(a, [{ left: '100px'}, {left: '200px'}], 
  {delay: 0.2 * 1000, duration: 0.3 * 1000, endDelay: 0.4 * 1000, iterations: 3, fill: 'both'});

var par = new AnimationGroup([anim], {fill: 'none', iterations: 2})

document.timeline.play(par);

