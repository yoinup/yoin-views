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

	child: Em.ContainerView.extend({
    // img cannot use "effect"
		classNames: ['square-image-bg'],
    childViews: ['child'],

    child: Em.View.extend({

      classNames: ['square-image-effect']

    })

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

			if (typeof(content) === 'string') {

				if (this.get('isFBUser')) {
          // TODO: fb api allows you to return the size of the picture /48/48 
          // or somethign like that
					src = 'http://graph.facebook.com/' + content + '/picture';

				} else {

					if (this.get('withChannel')) {

						if (this.get('isDisabled')) {
              content += '_disabled';
						}

            src = 'source/assets/images/' + content + '.png';

					}

				}

			} else {

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
