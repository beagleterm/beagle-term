
  
    document.addEventListener('polymer-ready', function() {
      var meta = document.createElement('core-meta');
      document.querySelector('template#default').model = {
        metadata: meta.list
      };
      
      var fruitMeta = document.createElement('core-meta');
      fruitMeta.type = 'fruit';
      document.querySelector('template#fruit').model = {
        metadata: fruitMeta.list
      };
    });
    
  