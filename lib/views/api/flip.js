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

        itemViewClass = this.getPath('parentView.frontView');

        if (Em.typeOf(itemViewClass) === "string") {
          itemViewClass = Em.getPath(itemViewClass);
        }

        console.log('flip did front');

        view = this.createChildView(itemViewClass, {});
        this.get('childViews').pushObject(view);

        itemViewClass = this.getPath('parentView.backView');

        if (Em.typeOf(itemViewClass) === "string") {
          itemViewClass = Em.getPath(itemViewClass);
        }

        console.log('flip did back');

        view = this.createChildView(itemViewClass, {});
        this.get('childViews').pushObject(view);

      }



    }


  })

});
