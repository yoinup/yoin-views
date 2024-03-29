var get = Ember.get , set = Ember.set;


Yn.BaseSwipeView = Ember.ContainerView.extend({
  
  itemViewClass: Em.View,

  contentIndex: 0,
  duration: 500,


  selected: null,
  content: null,

  //--- private properties
  isMoving: false,
  translatePosition: 0,

	activeIndex: null,
	activeLeftCss: null,


  init: function(){

    this._super();

		var itemViewClass = this.get('itemViewClass');

		if (Em.typeOf(itemViewClass) === "string") {
			itemViewClass = Em.get(itemViewClass);
			set(this, 'itemViewClass', itemViewClass);
		}

		var content = get(this, 'content');
    if (Em.typeOf(content) === "string") {
      content = Em.get(content);
      set(this, 'content', content);
    }


    
    var elements = ( content.get('length') > 1 ) ? ['-100%', '0%', '100%'] : ['0%'];    

		var self = this;
    elements.forEach(function(item) {
      var view = self.createChildView(itemViewClass, {});
      self.get('childViews').pushObject(view);
      view.on('didInsertElement', function() {
        view.$().css("left", item); 
      });
    });

    this.on('didInsertElement', function() {

      self.width = self.$().width();

    });

    this._reorderContent();

  },

	_reorderContent: function() {

		var content = this.get('content');
		var selected = this.get('selected');

		if ( !!content && !!selected ) {

			var i = content.get('length'), 
				isSelectedInContent = false;

			// content.some does not work, why?
			while( !isSelectedInContent && i-- ) {
				isSelectedInContent = (content.objectAt(i) === selected);
			}

			if ( isSelectedInContent ) {

				if ( !this.isMoving ) {

					this.contentIndex = i;
					this.activeIndex = 1;
					this.activeLeftCss = 0;
					this.translatePosition = 0;

					var contentIndex = this.contentIndex,
							index = this.activeIndex,
							tmpIndex,
							tmpContentIndex,
							child = this.get('childViews');



          if ( content.get('length') > 1 ) {
            tmpContentIndex = this._getContentIndex(false); 
            tmpIndex = this._getIndex(false); 
            child[tmpIndex].set('content', content.objectAt(tmpContentIndex) );

            child[index].set('content', content.objectAt(contentIndex) );

            tmpContentIndex = this._getContentIndex(true); 
            tmpIndex = this._getIndex(true); 
            child[tmpIndex].set('content', content.objectAt(tmpContentIndex) );
          } else {
            child[0].set('content', content.objectAt(0) );
          }


				} else {

					this.isMoving = false;

				}

			}

		}

	},




  transitionEnd: function() {


    if ( this.get('onTransition') ) {

      this.onTransition = false;

      var self = this;
      var left, leftIndex, rightIndex, leftContentIndex, rightContentIndex, contentIndex;

      var activeLeftCss = self.activeLeftCss;

      var child = self.get('childViews');
      var content = self.get('content');

      leftIndex = self._getIndex(false);

      rightIndex = self._getIndex(true);


      leftContentIndex = self._getContentIndex(false);
      contentIndex = self.get('contentIndex');
      rightContentIndex = self._getContentIndex(true);

      left = (activeLeftCss-1)*100+'%';
      child[leftIndex].$().css("left", left); 

      left = (activeLeftCss+1)*100+'%';
      child[rightIndex].$().css("left", left); 

      child[leftIndex].set('content', content.objectAt(leftContentIndex) );
      child[rightIndex].set('content', content.objectAt(rightContentIndex) );


      //self.set('translatePosition', translatePosition); --> to _move


      //console.log( content.objectAt(contentIndex) );
      self.set('selected', content.objectAt(contentIndex) );

    }


  },

  _move: function(next, fn) {

    if ( !this.isMoving ) {

				// it will be updated on setup content index
				this.isMoving = true;
				this.onTransition = true;

        var self = this;

				var activeLeftCss = this.activeLeftCss;
				activeLeftCss = ( next )  ? activeLeftCss+1 : activeLeftCss-1;
				this.activeLeftCss = activeLeftCss;

				this.contentIndex = this._getContentIndex(next);
				this.activeIndex = this._getIndex(next);

				var width = this.width;
				var translatePosition = this.translatePosition;


				translatePosition += (next) ? width*(-1): width;

        this._translateElement(translatePosition);
        this.translatePosition = translatePosition;
		}

  },

  _translateElement: function(translatePosition) {

    Em.assert(false, 'implement this method');

  },

  _getIndex: function( next ) {

		var result = this.activeIndex;
    result +=(next) ? 1:-1; 

    if ( result < 0 ) { 
      result = 2;
    } else if ( result > 2 ) { 
      result = 0;
    }

    return result;
  },

  _getContentIndex: function( next ) {

    var length = this.get('content.length');
		var result = this.contentIndex;
    result +=(next) ? 1:-1; 

    if ( result < 0 ) { 
      result = length-1;
    } else if ( result > length-1 ) { 
      result = 0;
    }

    return result;
  },

/*
	_contentChanged: Ember.observer( function() {

		this._reorderContent();

	}, 'content'),
  */

	_selectedChanged: Ember.observer( function() {

		this._reorderContent();

	}, 'selected')



});



var direction =  (!!Em.OneGestureDirection) ? (Em.OneGestureDirection.Left | Em.OneGestureDirection.Right) : 0;

Yn.SwipeView = Yn.BaseSwipeView.extend({

	swipeOptions: {
		direction: direction,
		cancelPeriod: 100,
		simultaneously: true,
		swipeThreshold: 20,
		initThreshold: 10
	},

	swipeEnd: function(recognizer) {

			
    var length = this.get('content.length');

		if ( length > 1 ) {

			var self = this;
			if ( recognizer.swipeDirection === Em.OneGestureDirection.Left ) {
              this._move(true);
			} else if ( recognizer.swipeDirection === Em.OneGestureDirection.Right ) {
              this._move(false);
			}

		}

	},

  _translateElement: function(translatePosition) {
    this.get('element').style.webkitTransform = 'translate3d('+translatePosition+'px,0,0)';
  }
  
});
