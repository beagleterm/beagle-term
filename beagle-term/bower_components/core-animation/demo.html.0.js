
      var customAnimationFn = function(timeFraction, target) {
        if (timeFraction < 1) {
          target.textContent = timeFraction;
        } else {
          target.textContent = 'animated!';
        }
      };

      document.addEventListener('polymer-ready', function() {
        document.querySelector('.animations').addEventListener('click',
          function(e) {
            var animation = e.target;
            if (animation.id === 'custom-animation') {
              animation.customEffect = customAnimationFn;
            }
            animation.target = target;
            animation.play();
          });
          document.getElementById('raw').addEventListener(
            'core-animation-finish', function(e) {
              console.log('finish!');
            });
      });
    