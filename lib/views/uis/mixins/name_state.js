Yn.NameStateMixin = Em.Mixin.create({

  classNameBindings: ['is_smaller_seven', 'is_smaller_thirteen', 'is_smaller_seventeen', 'is_higher_sixteen'],

  _namehanged: Ember.observer(function() {
    this._updateClassNames();
  }, 'name'),

  _updateClassNames: function() {

    var name = this.get('name');
    if ( name ) {

      
      var length = name.length;
      if (length < 7 ) {
        this.set('is_smaller_seven', true);
        this.set('is_smaller_thirteen', false);
        this.set('is_smaller_seventeen', false);
        this.set('is_higher_sixteen', false);
      } else if ( length < 13 ) {
        this.set('is_smaller_seven', false);
        this.set('is_smaller_thirteen', true);
        this.set('is_smaller_seventeen', false);
        this.set('is_higher_sixteen', false);
      } else if ( length < 17 ) {
        this.set('is_smaller_seven', false);
        this.set('is_smaller_thirteen', false);
        this.set('is_smaller_seventeen', true);
        this.set('is_higher_sixteen', false);
      } else {
        this.set('is_smaller_seven', false);
        this.set('is_smaller_thirteen', false);
        this.set('is_smaller_seventeen', false);
        this.set('is_higher_sixteen', true);
      }
    }

  }

});

