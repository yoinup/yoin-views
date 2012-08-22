Yn.FlipView = Em.ContainerView.extend({

  classNames: ['flip'],
  classNameBindings: ['isBack'],
    
  isBack: false,

  frontView: null,
  backView: null,

  childViews: ['child'],

  child: Em.ContainerView.extend({
    classNames: ['flip-transform'],

    didInsertElement: function() {
      this._super();


      var itemViewClass, 
          view;

      itemViewClass = this.getPath('parentView.frontView');

      if (Em.typeOf(itemViewClass) === "string") {
        itemViewClass = Em.getPath(itemViewClass);
      }

			view = this.createChildView(itemViewClass, {});
			this.get('childViews').pushObject(view);

      itemViewClass = this.getPath('parentView.backView');

      if (Em.typeOf(itemViewClass) === "string") {
        itemViewClass = Em.getPath(itemViewClass);
      }

			view = this.createChildView(itemViewClass, {});
			this.get('childViews').pushObject(view);



    }


  })

});
