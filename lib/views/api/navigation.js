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

// isMoving quitar
Yn.NavigationView = Em.ContainerView.extend({

  classNameBindings: ['isAnimated'],
  classNames: ['navigation'],
  isMoving: false,

  isAnimated: true,

  width: null,

  translatePosition: null,
  position: null,

  backState: null,

  initViewClass: null,

  views: null,

	init: function() {

		this._super();
		this.views = Ember.A([]);
		this.position = -1;


	},

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

        this._move(true, view.navigationAnimated);
      }

    }
  },

  pushView: function(newView, backState, transitionCallback, animated) {

    if ( !this.get('isMoving') ) {

      if ( transitionCallback !== undefined && Ember.typeOf(transitionCallback) === 'boolean') {
        animated = transitionCallback;
        transitionCallback = undefined;
      }

      if ( animated !== false ) {
        animated = true;
      }

      this.fire('willNavigateForward');

      this.set('transitionCallback', transitionCallback);

      this.set('position', this.get('position')+1 );
      newView.navigationBackState = backState;
      newView.navigationAnimated = animated;

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

  _translate: function(translatePosition, animated) {

    var self = this;
    Em.run.next(function() {
      self.set('isAnimated', animated);
    }); 


    Em.run.next(function() {
      self.get('element').style.webkitTransform = 'translate3d('+translatePosition+'px,0,0)';
    }); 
    this.set('translatePosition', translatePosition);

  },

  _move: function(forward, animated) {

    this.set('isMovingForward', forward);
    var translatePosition = this.get('translatePosition');
    if ( translatePosition === null ) {
       translatePosition = 0;
       animated = false; // to do endMovement
    } else {
      translatePosition += (forward) ? this.get('width')*(-1): this.get('width');
    }


    this._translate(translatePosition, animated);
    if ( !animated ) {
      this._endMovement(animated);
    }


  },

  _endMovement: function(animated) {

    if ( this.get('isMoving') ) {

      if ( !this.get('isMovingForward') ) {

        var childs =  this.get('childViews');

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


      var transitionCallback = this.get('transitionCallback');
      if ( !!transitionCallback ) {
        transitionCallback();
      }
      this.set('transitionCallback', null);
      this.set('isMoving', false);

      this.fire( this.get('isMovingForward' ) ? 'didNavigateForward' : 'didNavigateBackward');

    }

  },

  transitionEnd: function() {

    this._endMovement(true);

  },

  popView: function(animated) {

    
    if ( animated !== false ) {
      animated = true;
    }

    var childs = this.get('childViews'),
        length = childs.get('length');

    this.backState = childs[length-1].navigationBackState;

    if ( !this.get('isMoving') ) {

      this.fire('willNavigateBackward');

      this.set('isMoving', true );
      this.set('position', this.get('position')-1 );
      this._move(false, animated);
    }

  },


  popToRootView: function(fn) {

    var rootView = this.views[0],
        length,
        view,
        self = this,
        childs = this.get('childViews');


    if ( !childs.contains(rootView) ) {
      
      Em.run.next(function() {
        childs.unshiftObject( rootView );
      });

    }

    length = this.views.get('length');
    view = this.views[length-1];

    if ( view!==rootView ) {
      
      this.set('position', 0 );
      this._translate(0, false);


      while(view!==rootView) {

        this.views.popObject();

        if ( childs.contains(view) ) {
          childs.removeObject(view);
          view.navigatedDidInsertElementFired = false;
        }

        length = this.views.get('length');
        view = this.views[length-1];

      }

    }

    if ( fn ) {
      fn();
    }

  }

});
