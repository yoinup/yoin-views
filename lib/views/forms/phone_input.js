
Yn.PhoneInputView = Yn.InputView.extend({
  inputName:'phone',
  type: 'tel',

  defaultPrefix: Em.computed(function() {

      var prefix;
      // TODO: improve accessing this kind of vars
      if ( Yn.Env.Settings ) {
        prefix = Yn.Env.Settings.phonePrefix;
      }

      return prefix || '+34';

  }).property(),

  focusIn: function(event) {

    var value = this.get('value');
    if (!value) {
      this.set('value', this.get('defaultPrefix') );
    }
    this._super(event);

  },

  focusOut: function(event) {

    if ( this.get('value') === this.get('defaultPrefix') ) {
      this.set('value', null );
    }

    this._super(event);

  }



});
