
"use strict";
document.timeline.play(new Animation(document.body,
    [{textShadow: '100px 100px red, 0px 100px 20px red'}, {textShadow: '0px 0px'}], {duration: 2 * 1000, fill: 'forwards'}));
