Yn.Notification = Em.Mixin.create( Yn.Btap, {

	classNames: ['notification'],

	classNameBindings: ['isHidden'],

	isHidden: false,

	isInDom: null,
	hasBeenShowed: false,
	
	didInsertElement: function() {

		this._super();
		this.set('isHidden', true);
    this.set('hasBeenShowed', false);
    
    var self = this;
		Em.run.next(function() {
			self.set('isHidden', false);
		});

	},

	bTap: function() {

		this.set('isHidden', true);

	},

	transitionEnd: function() {

		if ( !this.get('isHidden') ) {

      this.set('hasBeenShowed', true);

			Ember.run.later(this, function(){

				this.set('isHidden', true);
				//console.log('The 1st event has finished');

			}, 4000);

		} else  {

			 if ( this.get('hasBeenShowed') ) {

       		this.set('isInDom', false);
       		//console.log('The 2nd event has finished');

       }

		}

	}

});
