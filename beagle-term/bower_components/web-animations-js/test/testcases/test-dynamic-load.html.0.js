
"use strict";

timing_test(function() {
    at(0.00, function() { assert_styles(".anim", {"left": "0px"}) });
    at(0.25, function() { assert_styles(".anim", {"left": "100px"}) });
    at(0.50, function() { assert_styles(".anim", {"left": "200px"}) });
  }, "Check left position");

window.addEventListener('load', function() {
  var s = document.createElement('script');
  s.src = "../../web-animations.js";
  s.addEventListener('load', function() {
    document.timeline.play(new Animation(a,
      [{left: "0px"}, {left: "200px"}],
      {duration: 0.5, fill: 'forwards'}
    ));

  })
  document.head.appendChild(s);
});
