
Ember.Handlebars.registerHelper('normalize_distance', function(options){

  var dis = Yn.DistanceParser.normalize(options.has.distanceBinding);
  console.log(dis);
  return dis;

});
