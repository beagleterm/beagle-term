
    var el = document.querySelector('core-a11y-keys');

    suite('<core-a11y-keys>', function() {

      test('target is parentNode by default', function() {
        assert.equal(el.target, el.parentNode);
      });

      // asyncPlatformFlush = (fn) => { Polymer.flush(); requestAnimationFrame(() => requestAnimationFrame(fn)) };
      asyncPlatformFlush = function(fn) {Polymer.flush(); requestAnimationFrame(function(){requestAnimationFrame(function() {fn()}) });};

      suite('keys attribute', function() {
        test('keys attribute sets up _desiredKeys', function(done) {
          el.keys = 'space';
          asyncPlatformFlush(function() {
            assert.isArray(el._desiredKeys);
            assert.deepEqual(el._desiredKeys[0], {key: 'space'});
            done();
          });
        });

        test('space separated keys', function(done) {
          el.keys = 'a b c';
          asyncPlatformFlush(function() {
            assert.deepEqual(el._desiredKeys, [{key: 'a'}, {key: 'b'}, {key: 'c'}]);
            done();
          });
        });

        test('modifier keys', function(done) {
          el.keys = 'shift+a alt+b ctrl+c alt+shift+ctrl+d';
          asyncPlatformFlush(function() {
            assert.deepEqual(el._desiredKeys[0], {key: 'a', shift: true});
            assert.deepEqual(el._desiredKeys[1], {key: 'b', alt: true});
            assert.deepEqual(el._desiredKeys[2], {key: 'c', ctrl: true});
            assert.deepEqual(el._desiredKeys[3], {key: 'd', alt: true, ctrl: true, shift: true});
            done();
          });
        });

      });

      suite('event listeners', function() {
        var listeners = false;
        var proto = el.__proto__;

        var origAEL, origREL;

        suiteSetup(function() {
          origAEL = proto.addEventListener;
          origREL = proto.removeEventListener;
          proto.addEventListener = function() { listeners = true; };
          proto.removeEventListener = function() { listeners = false; };
        });

        suiteTeardown(function() {
          proto.addEventListener = origAEL;
          proto.removeEventListener = origREL;
        });

        test('event listeners only active when in document', function(done) {
          var local = document.createElement('core-a11y-keys');
          assert.equal(listeners, false);
          document.body.appendChild(local);
          async.series([
            asyncPlatformFlush,
            function(cb) {
              assert.equal(listeners, true);
              cb();
            },
            asyncPlatformFlush,
            function(cb) {
              local.parentNode.removeChild(local);
              cb();
            },
            asyncPlatformFlush,
            function(cb) {
              assert.equal(listeners, false);
              cb();
            }
          ], done);
        });

      });

    });
  