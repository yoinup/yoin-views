// assign a Brand or User to the content and it will render the image
Yn.SquareImageView = Em.ContainerView.extend({

	classNameBindings: ['isLoading', 'withPhoto', 'withWebfont', 'withIcon', 'withChannel'],
	isLoading: true,
	withPhoto: false,
	withIcon: false,
	withWebfont: false,
	withChannel: false,
	isFBUser: false,
  action: 'holahola',
	
	isDisabled: false,

	classNames:['square-image'],
	childViews: ['child'],

	content: null,
  icon: null,

  init: function() {
    this._super();

    var self = this;
    this.on('didInsertElement', function() {
      self.setBackgroundImage();
    });

  },

	child: Em.View.extend({
    //is-icon-big could be done dinamically
		classNames: ['square-image-bg','is-icon-normal'],
		classNameBindings: ['icon'],

    attributeBindings: ['icon2'],
    iconBinding: Em.Binding.oneWay('parentView.withWebfont'),
    icon2Binding: Em.Binding.oneWay('parentView.icon')


	}),

	_pictureChanged: Ember.observer(function() {

		this.setBackgroundImage();

	}, 'content.isLoaded'),

	setBackgroundImage: function() {

		var content = this.get('content'),
				src;

		if ( !!content ) {

			if (typeof(content) === 'string') {

				if (this.get('isFBUser')) {
          // TODO: fb api allows you to return the size of the picture /48/48 
          // or somethign like that
					src = 'http://graph.facebook.com/' + content + '/picture';

				} else {

					if (this.get('withChannel')) {

            src = 'source/assets/images/' + content;

					}

				}

			} else if ( content.get('isLoaded') ) {

				var type = content.get('constructor');

				if ( type === Yn.Brand ) {

					src = content.get('picture');

				} else if ( type === Yn.User ) {

					src = content.get('avatar');

				} else if ( type === Yn.Product ) {

					src = content.get('squarePicture');

				}

      }

			if ( !!src ) {

				var self = this;

        if ( !self.get('isDestroying' ) && !self.get('isDestroyed') ) {

          var child$ = this.get('child').$();
          child$.css('background-image', 'url(' + src + ')' );

        }

			}

		}

	}

});


Yn.TapSquareImageView = Yn.SquareImageView.extend(Yn.Btap, {
});

Yn.NonSimultaneouslyTapSquareImageView = Yn.SquareImageView.extend(Yn.NonSimultaneouslyBtap, {
});
