
  
    var ratings = document.querySelector('#ratings');
    ratings.addEventListener('core-change', function() {
      document.querySelector('#ratingsLabel').textContent = ratings.value;
    });
  
  