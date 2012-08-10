// i18n helper for Handlebars
Ember.Handlebars.registerHelper('I18n', function(key, options){

  var isPluralize = false,
      pluralizeBinding,
      pluralize;

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

  return I18n.t(key);
});
