
var getBindingValue = function(context, options, path) {

  var normalized = Ember.Handlebars.normalizePath(null, path, options.data),
      thisContext;

  if (normalized.isKeyword) {
    thisContext = normalized.root;
  } else if (!Ember.isGlobalPath(path)) {
    thisContext = context;
  } else {
    thisContext = null;
  }

  return Em.Handlebars.getPath(thisContext, normalized.path);

};


Handlebars.registerHelper('if_eq', function(context, options) {

  var values = context.split(' '),
      value = getBindingValue(this, options, values[0]),
      expected = getBindingValue(this, options, values[1]);

  return (value === expected) ? options.fn(this) : options.inverse(this);

});

Handlebars.registerHelper('unless_eq', function(context, options) {

  var values = context.split(' '),
      value = getBindingValue(this, options, values[0]),
      expected = getBindingValue(this, options, values[1]);

  return (value !== expected) ? options.fn(this) : options.inverse(this);

});

Handlebars.registerHelper('if_type', function(context, options) {

		var value = getBindingValue(this, options, context),
				type = getBindingValue(this, options, options.hash.type);

  return (value.constructor === type) ? options.fn(this) : options.inverse(this);

});

Handlebars.registerHelper('unless_type', function(context, options) {

		var value = getBindingValue(this, options, context),
				type = getBindingValue(this, options, options.hash.type);

  return (value.constructor !== type) ? options.fn(this) : options.inverse(this);

});
