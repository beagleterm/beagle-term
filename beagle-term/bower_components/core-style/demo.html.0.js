
  (function() {

    addEventListener('polymer-ready', function() {
      var items = [];
        for (var i=0; i < 100; i++) {
          items.push(i);
        }

      CoreStyle.g.items = items;

      addEventListener('template-bound', function(e) {
        e.target.g = CoreStyle.g;
        e.target.items = items;
      });
    });

  })();
  