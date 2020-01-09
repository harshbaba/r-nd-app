function loadProductsWrapper(done){
    $.ajax({
      method : 'GET',
      url : products_data.partialsPath+'/products-wrapper.html',
      cache: false,
      success : function(data){
        var tmp = Handlebars.compile(data);
        Handlebars.registerPartial('productsWrapper', tmp);
        done(tmp);
      },
      fail : function(xhr) {
        console.log(xhr);
      }
    });
}

function loadProductList(done){
    $.ajax({
      method : 'GET',
      url : products_data.partialsPath+'/product-ind.html',
      cache: false,
      success : function(data){
        var tmp = Handlebars.compile(data);
        Handlebars.registerPartial('productInd', tmp);
        done(tmp);
      },
      fail : function(xhr) {
        console.log(xhr);
      }
    });
}