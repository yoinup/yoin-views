Yn.Application = Yn.BaseApplication.extend({

  getDinamicStyleContent: function() {
    var boxWidth = $(document.body).width()*0.935;
    var height = boxWidth*0.5;
    //console.log('width ' + boxWidth);

    var result = '.venue-box-products, .venue-box-products > .venue-box-products-swipe, .venue-box-products > .venue-box-products-swipe > .venue-product { ';
    result+='height: '+height + 'px; } ';
    return result;
  }


});
