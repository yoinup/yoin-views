Yn.Modal = Em.Mixin.create({

  isHidden: true,
  classNameBindings: ['isHidden'],
  classNames: ['modal'],


  transitionEnd: function(event) {
    // transitionEnd triggers multiple times
    // http://stackoverflow.com/questions/4062105/webkit-transitionend-event-grouping
    
    if ( event.originalEvent.propertyName === '-webkit-transform' && 
        $(event.target)[0] === this.$()[0] ) {
      var eventName = this.get('isHidden') ? 'transitionHide' : 'transitionShow' ;
      this.trigger(eventName);
    }

  }

});
