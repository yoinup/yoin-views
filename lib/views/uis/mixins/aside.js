Yn.AsideScreen = Em.Mixin.create({

  classNameBindings: ['isAsideBack']

});

Yn.AsideFrontSection = Em.Mixin.create( Yn.Btap, {

  classNames: ['aside', 'front'],
  action: 'closeAside',

  transitionEnd: function(event) {
    // TODO; myTransformEnd
    // transitionEnd triggers multiple times
    // http://stackoverflow.com/questions/4062105/webkit-transitionend-event-grouping
    if ( event.originalEvent.propertyName === '-webkit-transform' && 
        $(event.target)[0] === this.$()[0] ) {
      App.uiManager.endAsyncEvent();
    }

  }

});
