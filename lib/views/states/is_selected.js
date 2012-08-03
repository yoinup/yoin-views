
Yn.IsSelected = Ember.Mixin.create({

  classNameBindings: ['isSelected'],

  isSelected: Em.computed(function(){
    return ( this.get('content') === this.get('selected') );
  }).property('selected', 'content')

});
