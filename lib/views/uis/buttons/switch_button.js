
Yn.SwitchButtonView = Em.ContainerView.extend({

	classNames: ['switch-button'],
	classNameBindings: ['isDisabled'],

	childViews: ['left','right','button'],

	isOn: false,
	isDisabled: false,

	left: Em.View.extend({
		classNames: ['sb-label', 'sb-label-left']
	}),

	right: Em.View.extend({
		classNames: ['sb-label', 'sb-label-right']
	}),

	button: Em.ContainerView.extend({

		classNames: ['sb-inner'],
		childViews: ['child'],

		child: Em.View.extend({

			classNames: ['sb-inner-button'],
			percent:null,

			// twoWayBinding
			isOnBinding: 'parentView.parentView.isOn',

			isEnabled: Em.computed(function() {

				return !this.getPath('parentView.parentView.isDisabled');
				//return true;

			}).property('parentView.parentView.isDisabled'),

			_leftChanged: Em.observer(function() {

				var percent = this.get('percent');
				//console.log( 'percent ' + this.get('percent') );
				if ( percent !== null && this.leftView) {

					var handlePercent = this.width / this.switchButtonWidth * 100,
						aPercent = percent && handlePercent + ( 100 - handlePercent ) * percent / 100,
						bPercent = percent === 100 ? 0 : Math.min( handlePercent + 100 - aPercent, 100 );

					this.$().css( "left", percent+"%");
					this.leftView.$().css("width", aPercent+"%");
					this.rightView.$().css("width", bPercent+"%");
				} 

			}, 'percent' ),

			_isOnChanged: Em.observer(function() {


				var percent = this.get('isOn') ? 100 : 0;
				this.set('percent', percent);

			}, 'isOn' ),


			panOptions: {
				isEnabledBinding: 'isEnabled',
				
				//isEnabled: true,
				initThreshold: 10
			},

			didInsertElement: function(){

				this._super();

				this.switchButtonView = this.getPath('parentView.parentView');
				this.switchButtonWidth = this.switchButtonView.$().width();
				this.width = this.$().width();

				this.leftView = this.switchButtonView.left;
				this.rightView = this.switchButtonView.right;

				this._isOnChanged();
				this._leftChanged();

			},

			panChange: function(recognizer) {

				var changed = (100*recognizer.get('translation').x)/this.switchButtonWidth;
				var percent = this.get('percent') + changed;  
				if ( percent > 100 ) { 
					percent = 100;
				} else if ( percent < 0 ) { 
					percent = 0;
				}
				this.set('percent', percent);

			},
			panEnd: function(recognizer) {

				this._panFinished(recognizer);

			},
			panCancel: function(recognizer) {

				this._panFinished(recognizer);

			},

			_panFinished: function(recognizer) {

				// on gesture finished, isOn property must be setup based on nearest value of percent property
				var percent = ( this.get('percent') > 50 ) ? 100 : 0;

				this.set('isOn', percent === 100 );
				this.set('percent', percent);


			}

		})

	})

});
