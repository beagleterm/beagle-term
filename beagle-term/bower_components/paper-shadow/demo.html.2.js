
      document.addEventListener('polymer-ready', function() {
        var fab = document.getElementById('card');
        fab.addEventListener('shadow-z-changed', function() {
          document.getElementById('card-z').textContent = fab.z;
        });
      });
    