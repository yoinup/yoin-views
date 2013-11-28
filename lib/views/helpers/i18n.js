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

  console.log(key);
  console.log(options);
  console.log('-----------------');

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


  var properties = {},
      self = this,
      i18nKey,
      i18nValue;

  for ( var k in options.hash ) {

    if ( k !== 'toUpperCase' && k !== 'toLowerCase' && k !== 'capitalize' ) {
      i18nValue = Em.Handlebars.get(self, options.hash[k] );
      i18nKey = k;
      i18nKey = i18nKey.replace('param', '');
      i18nKey = i18nKey.replace('Binding', '');
      i18nKey = i18nKey.charAt(0).toLowerCase() + i18nKey.slice(1);
      properties[i18nKey] = i18nValue; 
    }

  }


  if ( isPluralize ) {
    key+='_pl';
  }

  result = I18n.t(key, properties);
  if ( options.hash.toUpperCase === true ) {
		//camelize
    result = result.toUpperCase();
  } else if ( options.hash.toLowerCase === true ) {
    result = result.toLowerCase();
  } else if ( options.hash.capitalize === true ) {
		result = result.capitalize();
	}

  return result;
});
