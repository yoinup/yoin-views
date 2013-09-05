
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

  var format = 'MMM DD h:mmA';

  if ( options.hash.format ) {
    format = options.hash.format;
  }
  
  result = moment( date ).format(format);

  return result;

});
