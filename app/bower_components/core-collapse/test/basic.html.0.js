
  
    function getCollapseComputedStyle() {
      var c = document.querySelector('#collapse');
      return getComputedStyle(c);
    }

    var collapse = document.querySelector('#collapse');
    
    var delay = 200;
    var collapseHeight;

    suite('basic', function() {

      test('verify attribute', function() {
        assert.equal(collapse.opened, true);
      });
      
      test('verify height', function(done) {
        Polymer.flush();
        setTimeout(function() {
          collapseHeight = getCollapseComputedStyle().height;
          // verify height
          assert.notEqual(collapseHeight, '0px');
          done();
        }, delay);
      });
      
      test('test opened: false', function(done) {
        collapse.opened = false;
        Polymer.flush();
        setTimeout(function() {
          var h = getCollapseComputedStyle().height;
          // verify height is 0px
          assert.equal(h, '0px');
          done();
        }, delay);
      });
      
      test('test opened: true', function(done) {
        collapse.opened = true;
        Polymer.flush();
        setTimeout(function() {
          var h = getCollapseComputedStyle().height;
          // verify height
          assert.equal(h, collapseHeight);
          done();
        }, delay);
      });

    });

  