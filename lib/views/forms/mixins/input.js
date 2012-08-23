
// defines a type of ModalView which will be used on different App view instances
Yn.Input = Ember.Mixin.create({
  value: "",
  tagName: 'input',
  type: 'text',

	attributeBindings: ['placeholder', 'type'],

  didInsertElement: function() {
    this._updateElementValue();
  },


  change: function(event) {
    this._elementValueDidChange();
  },


  focusIn: function(event) {

    Em.run.next(function() {
      window.scrollTo(0, 0);
    });

  },


  focusOut: function(event) {

    this._elementValueDidChange();
    // TODO: move to scroll, when keyboard dissapeared scroll to top
    Em.run.next(function() {
      window.scrollTo(0, 0);
		});
  },

  _updateElementValue: Ember.observer(function() {

    this.$().val( this.get('value') );

  }, 'value'),


  _elementValueDidChange: function() {

    this.set('value', this.$().val() );

  }

});

