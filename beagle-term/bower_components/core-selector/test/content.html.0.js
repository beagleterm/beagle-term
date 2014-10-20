
  
    var s = document.querySelector('test-core-selector');

    suite('content', function() {
      
      test('get selected', function(done) {
        asyncPlatformFlush(function() {
          // check selected class
          assert.isTrue(s.children[0].classList.contains('core-selected'));
          done();
        });
      });

      test('set selected', function(done) {
        // set selected
        s.selected = 'item1';
        asyncPlatformFlush(function() {
          // check selected class
          assert.isTrue(s.children[1].classList.contains('core-selected'));
          done();
        });
      });
      
      test('get items', function() {
        assert.equal(s.$.selector.items.length, s.children.length);
      });
      
      test('activate event', function(done) {
        s.children[2].dispatchEvent(new CustomEvent('tap', {bubbles: true}));
        asyncPlatformFlush(function() {
          // check selected class
          assert.isTrue(s.children[2].classList.contains('core-selected'));
          done();
        });
      });
      
      test('add item dynamically', function(done) {
        var item = document.createElement('div');
        item.id = 'item4';
        item.textContent = 'item4';
        s.appendChild(item);
        // set selected
        s.selected = 'item4';
        asyncPlatformFlush(function() {
          // check selected class
          assert.isTrue(s.children[4].classList.contains('core-selected'));
          done();
        });
      });

    });

  