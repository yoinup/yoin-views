
Ember.Handlebars.registerHelper('normalize_distance', function(options){

  var dis = Yn.DistanceParser.normalize(options.hash.distanceBinding);
  return dis;

});
