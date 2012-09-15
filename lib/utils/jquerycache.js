
Yn.jQueryCache = {

	outerHeightIncludeMarginCache:  new Yn.Cache(),
	outerHeightCache:  new Yn.Cache(),

	outerHeight: function(id, includeMargin) {

		if (arguments.length === 1) {
			includeMargin = false;
		}

		var result,
				cache = (includeMargin) ? this.outerHeightIncludeMarginCache : this.outerHeightCache;

		if ( cache.has(id) ) {
			//console.log('cache' +id);
			result = cache.get(id);
		} else {

			var view =  Em.View.views[id];
			// use cached jQueryElement is present
			result = ( !!view ) ? view.$().outerHeight(includeMargin) : $('#'+id).outerHeight(includeMargin);
			//console.log('set --> ' +id + ' value ' +result);
			cache.set(id, result);

		}


		return result;
	}

};

