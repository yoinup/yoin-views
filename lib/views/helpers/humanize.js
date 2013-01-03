
Ember.Handlebars.registerHelper('humanize', function(options){

  var dateBinding,
      date;

  dateBinding = options.hash.dateBinding;

  if ( dateBinding !== undefined ) {

    date = Em.Handlebars.get(this, dateBinding);

  } else {

    date = options.hash.date;

  }
  
  // console.log( date );
  // to DO extend format output
  return moment( date ).fromNow();

});
