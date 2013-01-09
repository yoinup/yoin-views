
// defines a type of ModalView which will be used on different App view instances
Yn.Input = Ember.Mixin.create(Yn.ContextManager, {
  value: "",
  tagName: 'input',
  type: 'text',

  scrollToOnFocusIn: true,

	attributeBindings: ['placeholder', 'type', 'value', 'incremental'],

  /*
  didInsertElement: function() {
    this._super();
    //this._updateElementValue();
    //this.get('element').defaultValue = 'ppcanodehuelva';
    //console.log( this.get('element').defaultValue );
  },
  */


  change: function(event) {
    //console.log('change...');
    this._elementValueDidChange();
  },

  focusIn: function(event) {

    if ( this.get('scrollToOnFocusIn') ) {
      Em.run.next(function() {
        window.scrollTo(0, 0);
      });
    }
    Yn.viewController.set('isKeyboard', true);

  },

  focusOut: function(event) {

    //this._elementValueDidChange();
    // TODO: move to scroll, when keyboard dissapeared scroll to top
    Em.run.next(function() {
      window.scrollTo(0, 0);
		});

    var action = this.get('focusOutAction');
    if ( !!action ) {
      this.triggerEvent( action );
    }


    Yn.viewController.set('isKeyboard', false);

  },


  _elementValueDidChange: function() {

    //console.log(' _elementValueDidChange ' + this._getCurrentInputValue() );
    this.set('value', this._getCurrentInputValue() );

  },

  _getCurrentInputValue: function() {

    return this.$().attr('value');

  }


});

