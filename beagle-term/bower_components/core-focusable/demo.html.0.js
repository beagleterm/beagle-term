
    (function() {
      var p = {

        eventDelegates: {
          down: 'downAction',
          up: 'upAction'
        },

        downAction: function() {
          // call overriden event delegate
          this._downAction();
          console.log('down');
        },

        upAction: function() {
          // call overriden event delegate
          this._upAction();
          console.log('up');
        }

      };

      Polymer.mixin2(p, Polymer.CoreFocusable);
      Polymer(p);
    })();
  