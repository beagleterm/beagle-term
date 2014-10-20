
    addEventListener('template-bound', function(e) {
      var template = e.target;
      var setName = 'svg-sample-icons';
      var icons = template.$.meta.byId(setName).iconNames;
      template.icons = icons.map(function(ic){ return setName + ':' +ic });
    });
  