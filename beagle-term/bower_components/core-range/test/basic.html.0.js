

    var range = document.querySelector('core-range');

    suite('basic', function() {
      
      test('check default', function() {
        assert.equal(range.min, 0);
        assert.equal(range.max, 100);
        assert.equal(range.value, 0);
      });

      test('set value', function(done) {
        range.value = 50;
        asyncPlatformFlush(function() {
          assert.equal(range.value, 50);
          // test clamp value
          range.value = 60.1;
          asyncPlatformFlush(function() {
            assert.equal(range.value, 60);
            done();
          });
        });
      });
      
      test('set max', function(done) {
        range.max = 10;
        range.value = 11;
        asyncPlatformFlush(function() {
          assert.equal(range.value, range.max);
          done();
        });
      });
      
      test('test ratio', function(done) {
        range.max = 10;
        range.value = 5;
        asyncPlatformFlush(function() {
          assert.equal(range.ratio, 50);
          done();
        });
      });
      
      test('set min', function(done) {
        range.min = 10
        range.max = 50;
        range.value = 30;
        asyncPlatformFlush(function() {
          assert.equal(range.ratio, 50);
          range.value = 0;
          asyncPlatformFlush(function() {
            assert.equal(range.value, range.min);
            done();
          });
        });
      });
      
      test('set step', function(done) {
        range.min = 0;
        range.max = 10;
        range.value = 5.1;
        asyncPlatformFlush(function() {
          assert.equal(range.value, 5);
          range.step = 0.1;
          range.value = 5.1;
          asyncPlatformFlush(function() {
            assert.equal(range.value, 5.1);
            done();
          });
        });
      });

    });

  