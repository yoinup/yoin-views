
// This approach is pending to be modified based on App evolution
// We could find forms based on other property/requirements
Yn.FormActionContent = Em.Mixin.create({

  actionContent:  Ember.computed(function() {

    var result = {},
      view;

    var inputs = this.get('inputs');
    if (Em.typeOf(inputs) === "string") {
			inputs = inputs.split(' ');
		}

    if ( inputs ) {

			// TODO; performance optimization
      Em.ArrayUtils.forEach(inputs, function(viewId) {

        //console.log( view.get('inputName') + '   ' + view.get('value') );
        view = Em.View.views[viewId];
        result[ view.get('inputName') ] = view.get('value');

      });

    }

    return result;

  }).property().volatile()

});
