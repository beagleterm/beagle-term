
"use strict";
document.timeline.play(new Animation(document.querySelector('#test'),
    [{fontWeight: '100'}, {fontWeight: '900'}],
    {duration: 1 * 1000, delay: 1 * 1000, fill: 'forwards'}));
