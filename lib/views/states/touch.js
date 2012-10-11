Yn.Touch = Ember.Mixin.create({

  classNameBindings: ['touch'],
  touch: false,

  touchStart: function() {
    this.set('touch', true);
  },

  touchCancel: function() {
    this.set('touch', false);
  },

  touchEnd: function() {
    this.set('touch', false);
  }

});
