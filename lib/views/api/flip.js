Yn.FlipView = Em.ContainerView.extend({

  classNames: ['flip'],
  classNameBindings: ['isBack'],
    
  isBack: false,

  frontView: null,
  backView: null,

  childViews: ['child'],

  child: Em.ContainerView.extend({
    classNames: ['flip-transform'],
    hasBeenInserted: false,

    didInsertElement: function() {
      this._super();

      if ( !this.get('hasBeenInserted') ) {
        this.set('hasBeenInserted', true);

        var itemViewClass, 
            view;

        itemViewClass = this.get('parentView.frontView');

        if (Em.typeOf(itemViewClass) === "string") {
          itemViewClass = Em.get(itemViewClass);
        }


        view = this.createChildView(itemViewClass, {});
        this.get('childViews').pushObject(view);

        itemViewClass = this.get('parentView.backView');

        if (Em.typeOf(itemViewClass) === "string") {
          itemViewClass = Em.get(itemViewClass);
        }


        view = this.createChildView(itemViewClass, {});
        this.get('childViews').pushObject(view);

      }



    }


  })

});
