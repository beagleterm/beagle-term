
    var output = document.querySelector('#output');
    // on-mediachange would give true or false as second param to the handler
    document.addEventListener('core-media-change', function(e) {
      output.textContent += '\nevent: ' + e.type + ' query: ' + e.detail.media + ' matches: ' + e.detail.matches;
    });
  