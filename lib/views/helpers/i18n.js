// i18n helper for Handlebars
Ember.Handlebars.registerHelper('I18n', function(key, options){

  var isPluralize = false,
      pluralizeBinding,
      result,
      pluralize;

  if (options === undefined ) {
    options = key;
    key = options.hash.key;

    if (key === undefined && options.hash.keyBinding !== undefined ) {
      key = Em.Handlebars.getPath(this, options.hash.keyBinding);
    }

  }

  pluralizeBinding = options.hash.pluralizeBinding;

  if ( pluralizeBinding !== undefined ) {

    pluralize = Em.Handlebars.getPath(this, pluralizeBinding);

  } else {

    pluralize = options.hash.pluralize;

  }


  if ( pluralize !== undefined ) {
    // boolean
    if ( pluralize === true || pluralize === false ) {

      isPluralize = pluralize;

    // integer 
    } else if ( pluralize % 1 === 0 ){

      // distinct than 0 is plural
      isPluralize = ( pluralize !== 1 );

    }

  }

  if ( isPluralize ) {
    key+='_pl';
  }

  result = I18n.t(key);
  if ( options.hash.toUpperCase === true ) {

    result = result.toUpperCase();

  }

  return result;
});
