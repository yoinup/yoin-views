var get = Ember.get , set = Ember.set, setPath = Ember.setPath, getPath = Ember.getPath;

Yn.Navigated = Em.Mixin.create({

  classNameBindings: ['isOneLevel', 'isTwoLevel', 'isThreeLevel', 'isFourLevel', 'isFiveLevel', 'isSixLevel'],
  classNames: ['navigated'],
  position: 0,

  isOneLevel: Em.computed(function() {

    return this.get('position') === 0;

  }).property('position'),

  isTwoLevel: Em.computed(function() {

    return this.get('position') === 1;

  }).property('position'),

  isThreeLevel: Em.computed(function() {

    return this.get('position') === 2;

  }).property('position'),

  isFourLevel: Em.computed(function() {

    return this.get('position') === 3;

  }).property('position'),

  isFiveLevel: Em.computed(function() {

    return this.get('position') === 4;

  }).property('position'),

  isSixLevel: Em.computed(function() {

    return this.get('position') === 5;

  }).property('position')


});


Yn.NavigationView = Em.ContainerView.extend({

  classNames: ['navigation'],
  isMoving: false,

  width: null,

  translatePosition: null,
  position: -1,

  backState: null,

  initViewClass: null,

  views: Ember.A([]),

  didInsertElement: function() {

    var width = this.$().width( );
    this.set('width', width);

    // insert initViewClass
    var initViewClass = this.get('initViewClass');
    if ( !!initViewClass ) {

      if (Em.typeOf(initViewClass) === "string") {
        initViewClass = Em.getPath(initViewClass);
      }

      //console.log('calling push views');
      var view = initViewClass.create({});
      this.pushView(view);
    }

  },

  didInsertStackChild: function(view){

    // bug: didInsertElement get fired twice for some weird reason
    if ( !view.navigatedDidInsertElementFired ) {

      //console.log('executing----> didinsertElement');
      view.navigatedDidInsertElementFired = true;

      if ( !this.views.contains( view ) ) {
        this.views.pushObject(view);
        view.set('position', this.get('position') ); 
        this._move(true);
      }

    }
  },

  pushView: function(newView, backState) {

    if ( !this.get('isMoving') ) {

      this.set('position', this.get('position')+1 );
      newView.navigationBackState = backState;

      if ( !Yn.Navigated.detect(newView)  ) {
        Em.mixin(newView, Yn.Navigated);
      }

      this.set('isMoving', true );

      var childs = this.get('childViews');
      
      var self = this;
      childs.pushObject(newView);

      newView.on('didInsertElement', function() {
        //console.log('didinsertElement');
        self.didInsertStackChild(this);
      });

      if ( childs.get('length') === 3 ) {
        var view = childs.shiftObject();
        view.navigatedDidInsertElementFired = false;
      }

    }

  },

  _move: function(forward, callback) {

    this.set('isMovingForward', forward);
    var translatePosition = this.get('translatePosition');
    if ( translatePosition === null ) {
       translatePosition = 0;
       this.set('isMoving', false);
    } else {
      var width = this.get('width');
      translatePosition += (forward) ? width*(-1): width;

      //this.get('element').style.webkitTransform = 'translate3d('+translatePosition+'px,0,0)';
    }

    this.set('translatePosition', translatePosition);

  },

  transitionEnd: function() {

    if ( this.get('isMoving') ) {

      var childs =  this.get('childViews');

      if ( !this.get('isMovingForward') ) {


        this.views.popObject();
        var view = childs.popObject();
        view.navigatedDidInsertElementFired = false;

        var length = this.views.get('length'); 
        if ( length > 1 && childs.get('length') === 1 ) {
          //console.log('unshifting backview');
          var backView = this.views[length-2];
          childs.unshiftObject( backView );

        }

      }

      this.set('isMoving', false);

    }

  },

  popView: function() {
    
    var childs = this.get('childViews'),
        length = childs.get('length');

    this.backState = childs[length-1].navigationBackState;

    if ( !this.get('isMoving') ) {

      this.set('position', this.get('position')-1 );
      this.set('isMoving', true );
      this._move(false);
    }

  }

});
