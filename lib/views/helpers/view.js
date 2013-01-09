
Ember.Handlebars.ViewHelper.reopen({

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
