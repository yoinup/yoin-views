
// defines a type of ModalView which will be used on different App view instances
Yn.Input = Ember.Mixin.create(Yn.ContextManager, {
  value: "",
  tagName: 'input',
  type: 'text',
	enableKeyChange: false,

  hasDelayed: false,
  valueDelayed: null,

  isDelayedUpdating: false,

  classNames: ['input'],

  scrollToOnFocusIn: false,

	attributeBindings: ['placeholder', 'type', 'value', 'incremental'],

  init: function() {

    this._super();
    this.hasDelayed = this.get('hasDelayed');
    this.isDelayedUpdating = false;

  },


  keyUp: function(event) {
		if ( this.get('enableKeyChange') ) {
			this._elementValueDidChange();
		}
	},

  change: function(event) {
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

    if ( this.get('scrollToOnFocusIn') ) {

      //this._elementValueDidChange();
      // TODO: move to scroll, when keyboard dissapeared scroll to top
      Em.run.next(function() {
        window.scrollTo(0, 0);
      });

    }

    var action = this.get('focusOutAction');
    if ( !!action ) {
      this.triggerEvent( action );
    }


    Yn.viewController.set('isKeyboard', false);

  },


  _elementValueDidChange: function() {

    //console.log(' _elementValueDidChange ' + this._getCurrentInputValue() );
    this.set('value', this._getCurrentInputValue() );
    if ( this.hasDelayed && !this.isDelayedUpdating ) {
      this.isDelayedUpdating = true;
      Em.run.later(this, function() {
        this.set('valueDelayed', this._getCurrentInputValue() );
        this.isDelayedUpdating = false;
      }, 800);

    }

  },

  _getCurrentInputValue: function() {

    return this.$().attr('value');

  }


});

