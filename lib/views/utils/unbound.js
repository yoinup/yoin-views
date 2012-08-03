Yn.UnboundView = Em.View.extend({

  item: null,

  didInsertElement: function() {
    this._super();
    this.$().text( this.get('item') );

  }

});
