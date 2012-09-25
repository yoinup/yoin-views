// assign a Brand or User to the content and it will render the image
Yn.SquareImageView = Em.ContainerView.extend({

	classNameBindings: ['isLoading', 'withPhoto', 'withIcon', 'withChannel'],
	isLoading: true,
	withPhoto: false,
	withIcon: false,
	withChannel: false,
	isFBUser: false,
	
	isDisabled: false,

	classNames:['square-image'],
	childViews: ['child'],

	content: null,

	child: Em.View.extend({
		classNames: ['square-image-bg']

	}),

	didInsertElement: function() {

		this._super();
		this.setBackgroundImage();

	},

	_pictureChanged: Ember.observer(function() {

		this.setBackgroundImage();

	}, 'content.isLoaded'),

	setBackgroundImage: function() {

		var content = this.get('content'),
				src;

		if ( !!content ) {

			if (typeof(content)=='string') {

				if (this.get('isFBUser')) {

					src = 'http://graph.facebook.com/' + content + '/picture';

				} else {

					if (this.get('withChannel')) {

						if (this.get('isDisabled')) {

							src = 'assets/images/' + content + '_disabled.png';

						} else {

							src = 'assets/images/' + content + '.png';

						}

					}

				}

			} else {

				var type = content.get('constructor');

				if ( type === Yn.Brand ) {

					src = content.get('picture');
					var s = content.store.serverDomain;
					if ( s ) {
						src = s.substring(0, s.length-1)+src;
					}

				} else if ( type === Yn.User ) {

					src = content.get('avatar');

				}

			}

			if ( !!src ) {

				var self = this;
				$('<img/>').attr('src', src).load(function() {

					if ( !self.get('isDestroying' ) && !self.get('isDestroyed') ) {
						self.$().css('background-image', 'url(' + src + ')' );
						self.set('isLoading', false);
					}
																				 
				});

			}

		}

	}

});
