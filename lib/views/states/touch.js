Ember.LOG_BINDINGS = true;

Yn.Touch = Ember.Mixin.create({

  classNameBindings: ['touch'],
  touch: false,

  touchStart: function() {
    this.$().addClass('touch');
  },

  touchCancel: function() {
    this.$().removeClass('touch');
  },

  touchEnd: function() {
    this.$().removeClass('touch');
  }

});
