Yn.AsideContainer = Em.Mixin.create({

	classNames: ['aside-container'],
  classNameBindings: ['isAsideRight', 'isAsideLeft']

});

Yn.AsideFrontSection = Em.Mixin.create( Yn.Btap, {

  classNames: ['aside-front'],
  action: 'closeAside',

  //TODO: improvement
  transitionEnd: function(event) {
    // TODO; myTransformEnd
    // transitionEnd triggers multiple times
    // http://stackoverflow.com/questions/4062105/webkit-transitionend-event-grouping
    if ( event.originalEvent.propertyName === 'left' && 
        $(event.target)[0] === this.$()[0] ) {
      App.uiManager.endAsyncEvent();
    }

  }

});
