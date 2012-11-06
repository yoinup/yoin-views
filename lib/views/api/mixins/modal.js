Yn.Modal = Em.Mixin.create({

  isHidden: true,
  classNameBindings: ['isHidden'],
  classNames: ['modal'],


  transitionEnd: function(event) {
    // transitionEnd fires multiple times
    // http://stackoverflow.com/questions/4062105/webkit-transitionend-event-grouping
    if ( event.originalEvent.propertyName === '-webkit-transform' ) {
      var eventName = this.get('isHidden') ? 'transitionHide' : 'transitionShow' ;
      this.fire(eventName);
    }

  }

});
