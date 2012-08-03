Yn.ProductImageView = Em.View.extend(Yn.IsLoading, {

  tagName: 'img',
  classNames: ['l-fit', 'product_image'],
  attributeBindings: ['src'],

  picture: null,


  _pictureChanged: Ember.observer(function() {

    this.set('isLoading', true);

    var picture = this.get('picture');
    if ( picture ) {
      var src = 'assets/images/products/';
      src += picture;
      src += '.png';
      this.set('src',src); 
    }

  }, 'picture') 

});
