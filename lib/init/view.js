Em.View.reopen({

	screenContext: Em.computed(function(key, value) {

    if (arguments.length === 2) {
      return value;
    }
  
    var view = this.get('parentView');
    var result; 

    while ( !result && view) {
      result = view.get('screenContext');
      view = view.get('parentView');
    }

		return result;

	}).property()

});
