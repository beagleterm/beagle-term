

    var b1 = document.getElementById('button1');

    test('aria role is a button', function() {
      assert.strictEqual('button', b1.getAttribute('role'));
    });

    test('aria-disabled is set', function(done) {
      assert.ok(b1.hasAttribute('aria-disabled'));
      b1.removeAttribute('disabled');
      asyncPlatformFlush(function() {
        assert.ok(!b1.hasAttribute('aria-disabled'));
        done();
      });
    });

  