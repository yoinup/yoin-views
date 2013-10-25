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
      key = Em.Handlebars.get(this, options.hash.keyBinding);
    }

  }

  pluralizeBinding = options.hash.pluralizeBinding;

  if ( pluralizeBinding !== undefined ) {

    pluralize = Em.Handlebars.get(this, pluralizeBinding);

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
		//camelize
    result = result.toUpperCase();
  } else if ( options.hash.toLowerCase === true ) {
    result = result.toLowerCase();
  } else if ( options.hash.capitalize === true ) {
		result = result.charAt(0).toUpperCase() + result.slice(1);
	}

  return result;
});
