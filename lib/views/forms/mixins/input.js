
// defines a type of ModalView which will be used on different App view instances
Yn.Input = Ember.Mixin.create(Yn.ContextManager, {
  value: "",
  tagName: 'input',
  type: 'text',

	attributeBindings: ['placeholder', 'type', 'value'],

  didInsertElement: function() {
    this._super();
    //this._updateElementValue();
    //this.get('element').defaultValue = 'ppcanodehuelva';
    //console.log( this.get('element').defaultValue );
  },


  change: function(event) {
    //console.log('change...');
    this._elementValueDidChange();
  },



  focusIn: function(event) {

    Em.run.next(function() {
      window.scrollTo(0, 0);
    });

  },

  focusOut: function(event) {

    //this._elementValueDidChange();
    // TODO: move to scroll, when keyboard dissapeared scroll to top
    Em.run.next(function() {
      window.scrollTo(0, 0);
		});

    var action = this.get('focusOutAction');
    if ( !!action ) {
      this.manager.send( action );
    }

  },


  _elementValueDidChange: function() {

    //console.log(' _elementValueDidChange ' + this._getCurrentInputValue() );
    this.set('value', this._getCurrentInputValue() );

  },

  _getCurrentInputValue: function() {

    return this.$().attr('value');

  }

/*
  _updateElementValue: Ember.observer(function() {

    var newValue = this.get('value');
    var inputValue = this._getInputValue();

    if ( newValue !== inputValue ) {

      console.log(' updateElementValue ' + newValue + ' old ' +inputValue );
      //this.$().val( newValue );
      this.$().attr( 'value', newValue );
      //this.$().value = newValue;
      
    } else {

      console.log(' !!!!updateElementValue ' + newValue + ' old ' +inputValue );

      this.$().attr( 'value', newValue );
    }

  }, 'value'),


  _elementValueDidChange: function() {

    console.log(' _elementValueDidChange ' + this._getInputValue() );
    this.set('value', this._getInputValue() );

  },

  */


});

