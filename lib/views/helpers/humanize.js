
Ember.Handlebars.registerHelper('humanize', function(options){

  var dateBinding,
      capitalize,
      result,
      date;

  dateBinding = options.hash.dateBinding;

  capitalize = options.hash.capitalize;

  if ( dateBinding !== undefined ) {

    date = Em.Handlebars.get(this, dateBinding);

  } else {

    date = options.hash.date;

  }
  
  // console.log( date );
  // to DO extend format output
  result = moment( date ).fromNow();


  return (capitalize) ? result.capitalize() : result;

});
