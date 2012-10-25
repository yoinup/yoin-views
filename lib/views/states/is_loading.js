// you must setup isLoading = true when resource is being loaded
Yn.IsLoading = Ember.Mixin.create({

  classNameBindings: ['isLoading'],
  isLoading: true,

  didInsertElement: function() {

    this._super();
    var self = this;

    this.$().load( function(el){
      if ( !self.get('isDestroying' ) && !self.get('isDestroyed') ) {
        self.set('isLoading', false);
      }
    });

  }

});
