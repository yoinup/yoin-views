
Yn.BoundView = Em.View.extend({

  item: null,

  render: function(buffer) {
    buffer.push( this.get('item') );
  },


  _itemDidChange: Ember.observer(function() {
    this.rerender();
  }, 'item')

});
