
// This approach is pending to be modified based on App evolution
// We could find forms based on other property/requirements
Yn.FormActionContent = Em.Mixin.create({

  actionContent:  Ember.computed(function() {

    var result = {},
        value,
        view;

    var inputs = this.get('inputs');
    if (Em.typeOf(inputs) === "string") {
			inputs = inputs.split(' ');
		}

    if ( !!inputs ) {

			// TODO; performance optimization
      inputs.forEach(function(viewId) {

        //console.log( view.get('inputName') + '   ' + view.get('value') );
        view = Em.View.views[viewId];
        value = view.get('value');
        if ( !!value ) {
          result[ view.get('inputName') ] = value;
        }

      });

    }

    return result;

  }).property().volatile()

});
