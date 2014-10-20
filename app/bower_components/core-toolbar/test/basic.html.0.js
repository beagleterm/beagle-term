

    var toolbar = document.querySelector('core-toolbar');

    suite('basic', function() {
      
      test('check default height', function() {
        assert.equal(toolbar.offsetHeight, 64);
      });
      
      test('check medium-tall height', function(done) {
        toolbar.classList.add('medium-tall');
        asyncPlatformFlush(function() {
          assert.equal(toolbar.offsetHeight, 128);
          done();
        });
      });
      
      test('check tall height', function(done) {
        toolbar.classList.add('tall');
        asyncPlatformFlush(function() {
          assert.equal(toolbar.offsetHeight, 192);
          done();
        });
      });
      
      test('item at top', function(done) {
        var item = document.createElement('div');
        toolbar.appendChild(item)
        asyncPlatformFlush(function() {
          assert.equal(item.getDestinationInsertionPoints()[0].parentElement, toolbar.$.topBar);
          done();
        });
      });
      
      test('item at middle', function(done) {
        var item = document.createElement('div');
        item.classList.add('middle');
        toolbar.appendChild(item)
        asyncPlatformFlush(function() {
          assert.equal(item.getDestinationInsertionPoints()[0].parentElement, toolbar.$.middleBar);
          done();
        });
      });
      
      test('item at bottom', function(done) {
        var item = document.createElement('div');
        item.classList.add('bottom');
        toolbar.appendChild(item)
        asyncPlatformFlush(function() {
          assert.equal(item.getDestinationInsertionPoints()[0].parentElement, toolbar.$.bottomBar);
          done();
        });
      });
      
    });

  