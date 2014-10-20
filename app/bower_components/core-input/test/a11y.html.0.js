

    var i1 = document.getElementById('input1');
    var i2 = document.getElementById('input2');

    test('aria-label set to placeholder', function(done) {
      assert.strictEqual('label', i1.getAttribute('aria-label'));
      i1.placeholder = 'new label';
      asyncPlatformFlush(function() {
        assert.strictEqual('new label', i1.getAttribute('aria-label'));
        done();
      });
    });

    test('aria-disabled is set', function(done) {
      assert.ok(i2.hasAttribute('aria-disabled'));
      i2.removeAttribute('disabled');
      asyncPlatformFlush(function() {
        assert.ok(!i2.hasAttribute('aria-disabled'));
        done();
      });
    });

  