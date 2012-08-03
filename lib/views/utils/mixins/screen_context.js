
Yn.ScreenContext = Ember.Mixin.create({

	manager: null,

  didInsertElement: function() {

      this._super();
      var manager = this.get('manager');

      if ( !manager ) {

        var context = this.get('screenContext');
        if ( !!context ) {
          manager = context.manager;
        }

      }

      if ( Em.typeOf(manager) === "string" ) {
        manager = Em.getPath(manager);
      }

      this.manager = manager;

  }


});
