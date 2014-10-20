
      document.addEventListener('polymer-ready', function() {
        var fab = document.getElementById('fab');
        fab.addEventListener('shadow-z-changed', function() {
          document.getElementById('fab-z').textContent = fab.z;
        });
      });
    