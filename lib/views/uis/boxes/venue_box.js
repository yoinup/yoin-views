
Yn.VenueNearPlusButtonView = Em.View.extend(Yn.Btap, {

  people: null,
  venue: null,

  bTap: function() {
    var venue = this.get('venue'), 
        people = this.get('people'),
        context = {venue: venue, people: people};

    this.triggerEvent(this.get('action'), context);
  }

});

Yn.VenueNearUserSquareImageView = Yn.TapSquareImageView.extend({

  content: null,
  venue: null,

  venueBox: null,

  didInsertElement: function() {
    this._super();
    this.venueBox = this.nearestOfType(Yn.VenueBoxView);
  },

  bTap: function() {

    var product = this.venueBox.get('selected'),
        venue = this.get('venue'),
        user = this.get('content'),
        context = {user: user, product: product, venue: venue};

    this.triggerEvent('inviteToNearFriend',  context);

  }

});

var direction =  (!!Em.OneGestureDirection) ? (Em.OneGestureDirection.Left | Em.OneGestureDirection.Right) : 0;

Yn.UnTapVenueBoxProductSwipeView = Yn.SwipeView.extend({

	width: 320,
  classNames: ['venue-box-products-swipe'],

  venue: null,
  content:null,
  selected:null,

	swipeOptions: {
		direction: direction,
		cancelPeriod: 100,
    simultaneously: true,
		swipeThreshold: 30,
		initThreshold: 10
	},

  init: function() {
    this._super();

    var self = this;


    if ( this.get('content.length') === 1 ) {
      // TODO: improve performance in Android Scrolling
      var swipeGesture;
      var gestures = this.get('eventManager.gestures');
      gestures.forEach(function(gesture) {
        if (gesture.name === 'swipe') {
          swipeGesture = gesture;
        }
      });
      gestures.splice(gestures.indexOf(swipeGesture), 1);
    }

  },

  itemViewClass: Em.View.extend( Yn.IsLoading, {
    /*
    tagName: 'img',
    attributeBindings: ['src'],
    srcBinding: 'content.picture',
    */
    classNames: ['venue-product'],
    didInsertElement: function() {
      this._super();
      this.setBackgroundImage();

    },

    _pictureChanged: Ember.observer(function() {

      this.setBackgroundImage();

    }, 'content.isLoaded'),

    setBackgroundImage: function() {

      var content = this.get('content'),
          el$ = this.$();

      if ( !!content && content.get('isLoaded') && !!el$ ) {

        el$.css('background-image', 'url(' + content.get('picture') + ')' );

      }

    }
  }),


  swipeStart: function(gesture, evt) {
    evt.preventDefault();
  },

  swipeChange: function(gesture, evt) {
    evt.preventDefault();
  },

  swipeEnd: function(gesture, evt) {
    this._super(gesture, evt);
    evt.preventDefault();
  }

});

Yn.VenueBoxProductSwipeView = Yn.UnTapVenueBoxProductSwipeView.extend(Yn.Btap, {

  action: 'selectVenueProduct',
  actionContent: Em.computed(function() {

    return { venue: this.get('venue'),
             product: this.get('selected') };

  }).property('venue', 'selected')

});

// TODO: hasBrandPicture does not work
// cannot access to brand.isLoaded in fixtures
// height setup in venueBox script
Yn.VenueBoxView = Em.View.extend({
  classNameBindings: ['hasPeople', 'hasDescription', 'showCode'],
  classNames: ['venue-box', 'box'],
    
  invitation: null, 
  venue:null,
  brand:null,
  products: null,
  product: null,
  selected: null,

  showCode: false,

  loggedUser: null,

  hasSelectedUser: null,

  hasDescription: false,
  hasBrandName: false,
  hasSelect: false,

  isGeopositionOn: false,

  init: function() {
    this._super();
    // observers are not fired at startup
    this._productChanged();
    this._productsChanged();

  },

  showGeoposition: Em.computed(function() {

    return this.get('hasSelect') && this.get('isGeopositionOn') && this.get('venue.distance') > 0;

  }),

  _productChanged: Ember.observer(function() {

    var product = this.get('product');
    if ( !!product ) {
      var items = Em.A([]);
      items.pushObject(product);
      this.set('products', items);
    }

  }, 'product'),


  _productsChanged: Ember.observer(function() {

    var products = this.get('products');
    if ( !this.get('selected') && !!products && products.get('length') > 0 ) {
      this.set('selected', products.get('firstObject') );
    }

  }, 'products.@each'),

  // remove the current loggedUser if present
  people: Em.computed(function() {
    var result = Em.A([]),
        index = 0,
        nearUsers = this.get('venue.nearUsers'),
        loggedUser = this.get('loggedUser'),
        length = nearUsers.get('length');


    if ( !!loggedUser && !!nearUsers && loggedUser.get('isLoaded') && nearUsers.get('isLoaded') ) {

      while ( index < length  ) {
        var item = nearUsers.objectAt(index);
        if ( item !== loggedUser ) {
          result.pushObject(item);
        }
        index++;
      }

    }
    return result;

  }).property('venue.nearUsers.isLoaded', 'loggedUser.isLoaded'),

  hasPeople: Em.computed(function() {

    if ( this.get('hasSelectedUser') || !this.get('hasSelect') ) return false;
    var length = this.get('people.length');
    return (!!length) ? length > 0 : false;

  }).property('people', 'hasSelectedUser'),

  templateName: 'venue_box'

});

Yn.LandingVenueBoxView = Yn.VenueBoxView.extend({
  hasSelect: true,

  templateName: 'landing_venue_box'
});
