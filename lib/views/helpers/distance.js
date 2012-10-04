
Ember.Handlebars.registerHelper('normalize_distance', function(options){

	var distanceBinding = options.hash.distanceBinding,
			dis = 0;

	if ( distanceBinding !== undefined ) {
  	var dis = Yn.DistanceParser.normalize(Em.Handlebars.getPath(this, distanceBinding));
  }

  return dis;

});
