Yn.IsScrollVisible = Em.Mixin.create({

  scrollVisibleId: null,
  isScrollVisible: false,

  didInsertElement: function() {

    this._super();

    var scroll = $(this.scrollVisibleId);

    var self = this,
      height = self.$().height();

    var wrapper = scroll.parent();
    var limit = wrapper.offset().top + wrapper.height();


    var destroyCheck = function() {
      scroll.unbind('touchmove',check);
    };

    var check = function() {

      var elemTop = self.$().offset().top;

      //console.log( Em.String.fmt('checking:  top (%@)  docViewBottom (%@)', [elemTop, limit]) );

      if (  (elemTop <= limit) ) {

        destroyCheck();
        self.set('isScrollVisible', true);
        self.appear();

      }
                              
    };

    scroll.bind('touchmove',check);

    // check before first touch move
    check();

  },

  appear: function() {

  }


});
