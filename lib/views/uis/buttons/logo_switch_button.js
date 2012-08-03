
Yn.LogoSwitchButtonView = Em.View.extend( Yn.Btap, {
  classNames: ['logo-switch-button'],
  classNameBindings: ['isOn'],

  isOn: false,

	swipeOptions: {
    direction: Em.OneGestureDirection.Left | Em.OneGestureDirection.Right,
    cancelPeriod: 100,
    swipeThreshold: 6,
    initThreshold: 3
	},

	swipeEnd: function(recognizer) {

    var currentValue = this.get('isOn');
    var direction = recognizer.swipeDirection;

    if ( ( direction === Em.OneGestureDirection.Left && currentValue) ||
         ( direction === Em.OneGestureDirection.Right && !currentValue) ){ 

      this.change(!currentValue);

    }

  },

  bTap: function() {

    var currentValue = this.get('isOn');
    this.change(!currentValue);

  },

  change: function( enabled ) {

    this.set('isOn', enabled);

  }

});
