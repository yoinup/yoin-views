
Yn.AppContainerView = Em.ContainerView.extend({
  elementId: 'app',
  classNameBindings: ['isGesturesBlocked'],
  isGesturesBlocked: false,

  touchStart: function(event) {

    if ( Yn.viewController.get('isKeyboard') && !$(event.target).is('input') ) {
      console.log('hidding keyboard');
      this.hideKeyboard();

    }

  },

  hideKeyboard: function() {
    document.activeElement.blur();
    $("input").blur();
  }

});

Yn.AppView = Em.View.extend({

  elementId: 'app',
  classNameBindings: ['isGesturesBlocked'],
  isGesturesBlocked: false,

  touchStart: function(event) {

    if ( Yn.viewController.get('isKeyboard') && !$(event.target).is('input') ) {
      console.log('hidding keyboard');
      this.hideKeyboard();

    }

  },

  hideKeyboard: function() {
    document.activeElement.blur();
    $("input").blur();
  }

});
