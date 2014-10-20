

    document.addEventListener('polymer-ready', function() {
      // initial setup
      setup();
      document.getElementById('animate-me').removeAttribute('hidden');
    });

    var meta;
    var transition;
    var state = {
      opened: false
    }

    function getMeta() {
      if (!meta) {
        meta = document.createElement('core-meta');
        meta.type = 'transition';
      }
      return meta;
    }

    function setup() {
      var target = document.getElementById('animate-me');

      if (transition) {
        transition.teardown(target);
      }

      var value = document.getElementById('sel').selectedOptions[0].value;
      transition = getMeta().byId(value);
      transition.setup(target);
    }

    function stuff() {
      var target = document.getElementById('animate-me');
      state.opened = !state.opened;
      transition.go(target, state);
    }
  