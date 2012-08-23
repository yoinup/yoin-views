
Ember.Handlebars.ViewHelper.reopen({

  viewClassFromHTMLOptions: function(viewClass, options, thisContext) {

		var mixins = [],
				result;

		if (options.hash.mixins) {

      var mixinIds = options.hash.mixins.split(' '),
          mixin;

      Em.ArrayUtils.forEach(mixinIds, function(mixinId) {

				//console.log('inserting mixinId ' + mixinId);
        mixin = Em.getPath(mixinId);
        Ember.assert("You must pass available mixins to 'mixin property' ", !!mixin);
        Ember.assert("'mixin property' must point to Ember.Mixin instances ", ( mixin instanceof Ember.Mixin ) );
        mixins.push(mixin);

      });

			delete options.hash.mixins;

		}


    result = this._super(viewClass, options, thisContext);


		if ( mixins.length > 0 ) {
      result.reopen.apply(result, mixins);
    }

		return result;

  },


  helper: function(thisContext, path, options) {

    for (var prop in options.hash) {

      if (/I18n$/.test(prop)) {

				var newProperty = prop.replace(/I18n$/, "");
				options.hash[newProperty] = I18n.t( options.hash[prop] );
/*
				console.log( prop + ' ' +  options.hash[prop] );
				console.log( newProperty + ' ' +  options.hash[newProperty] );
				console.log ( options.hash );
*/

				delete options.hash[prop];

      } 


    }

		this._super(thisContext, path, options);

	}

});
