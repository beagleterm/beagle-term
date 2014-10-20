

    var a1 = document.getElementById('autogrow1');
    var t1 = document.getElementById('textarea1');

    function dispatchInputEvent(target) {
      var e = new Event('input', {
        bubbles: true
      });
      target.dispatchEvent(e);
    };

    suite('basic', function() {

      teardown(function(done) {
        t1.value = '';
        dispatchInputEvent(t1);
        a1.rows = 1;
        a1.maxRows = 0;

        asyncPlatformFlush(function() {
          done();
        });
      });

      test('empty input has height', function() {
        assert.ok(a1.offsetHeight > 0);
      });

      test('accepts number input', function() {
        t1.value = 1;
        dispatchInputEvent(t1);
        // make sure we didn't crash
      });

      test('grows with more rows of input', function(done) {
        t1.value = 'foo\nbar';
        dispatchInputEvent(t1);

        var h1 = a1.offsetHeight;

        t1.value = 'foo\nbar\nbaz';
        dispatchInputEvent(t1);

        asyncPlatformFlush(function() {
          var h2 = a1.offsetHeight;
          assert.ok(h2 > h1);
          assert.deepEqual(a1.getBoundingClientRect(), t1.getBoundingClientRect());
          done();
        });
      });

      test('honors the rows attribute', function(done) {
        var h1 = a1.offsetHeight;
        a1.rows = 2;

        asyncPlatformFlush(function() {
          var h2 = a1.offsetHeight;
          assert.equal(h2, 2 * h1);
          done();
        });
      });

      test('honors the maxRows attribute', function(done) {
        var h1 = a1.offsetHeight;
        a1.maxRows = 2;

        t1.value = 'foo\nbar\nbaz\nzot';
        dispatchInputEvent(t1);

        asyncPlatformFlush(function() {
          var h2 = a1.offsetHeight;
          assert.equal(h2, 2 * h1);
          done();
        });
      });

    });

  