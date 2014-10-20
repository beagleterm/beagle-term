
"use strict";

var effect = [{transform: "translate(-800px,0px)"}, {transform: "translate(0px,0px)"}];

var group = new AnimationGroup();
document.timeline.play(new AnimationGroup([
    new Animation(overflow,
                  effect,
                  { duration: 0.3 * 1000, delay: 0.25 * 1000, fill: 'forwards' })]));

document.timeline.play(new AnimationGroup([
    new Animation(overflowControl,
                  effect,
                  { duration: 0.3 * 1000, delay: 0.2 * 1000, fill: 'forwards' })]));

document.timeline.play(new AnimationGroup([
    new Animation(underflow,
                  effect,
                  { duration: 0.3 * 1000, delay: 0.20001 * 1000, fill: 'none' })]));

document.timeline.play(new AnimationGroup([
    new Animation(underflowControl,
                  effect,
                  { duration: 0.3 * 1000, delay: 0.2 * 1000, fill: 'none' })]));

