
Ember.Handlebars.registerHelper('format_date', function(options){

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
  
  result = moment( date ).format('MMM DD h:mmA');

  return result;

});
