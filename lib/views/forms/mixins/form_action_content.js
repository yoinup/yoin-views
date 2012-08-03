
// This approach is pending to be modified based on App evolution
// We could find forms based on other property/requirements
Yn.FormActionContent = Em.Mixin.create({
  forms: null,

  actionContent:  Ember.computed(function() {

    var result = {},
      view;

    var forms = this.get('forms');
    if ( forms ) {

      forms.forEach( function(viewId) {

        view = Em.View.views[viewId];
        //console.log( view.get('inputName') + '   ' + view.get('input').get('value') );
        result[ view.get('inputName') ] = view.get('input').get('value');

      });
    }

    return result;


  }).property().volatile()


});
