
var getBindingValue = function(context, options, path) {

  var normalized = Ember.Handlebars.normalizePath(context, path, options.data),
      newPath,
      thisContext;

  var pathRoot = normalized.root;
  path = normalized.path;

  return Em.Handlebars.get(pathRoot, path);

};


Handlebars.registerHelper('if_odd_in_list', function(context, options) {

  var values = context.split(' '),
      item = getBindingValue(this, options, values[0]),
      list = getBindingValue(this, options, values[1]);

  var index = list.indexOf(item);
  Em.assert('if_odd_in_list element must be in list' , index !== -1) ;
  index++;
  return (index%2) ? options.fn(this) : options.inverse(this);

});


Handlebars.registerHelper('if_eq', function(context, options) {

  var values = context.split(' ');
  var value = getBindingValue(this, options, values[0]);
  var expected = getBindingValue(this, options, values[1]);


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
