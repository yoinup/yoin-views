
var getBindingValue = function(context, options, path) {

  var normalized = Ember.Handlebars.normalizePath(context, path, options.data),
      newPath,
      thisContext;

  var pathRoot = normalized.root;
  path = normalized.path;


  return Em.Handlebars.get(pathRoot, path);

};


Handlebars.registerHelper('if_eq', function(context, options) {

  var values = context.split(' '),
      value = getBindingValue(this, options, values[0]),
      expected = getBindingValue(this, options, values[1]);

  console.log(values[0]);
  console.log(value);

  console.log(values[1]);
  console.log(expected);
  console.log(' -------------- ');

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
