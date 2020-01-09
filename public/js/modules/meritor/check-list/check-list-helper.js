function loadCheckListPopup(done){
    $.ajax({
      method : 'GET',
      url : pageObj.partialsPath+'/check-list.html',
      cache: false,
      success : function(data){
        var tmp = Handlebars.compile(data);
        Handlebars.registerPartial('checkList', tmp);
        done(tmp);
      },
      fail : function(xhr) {
        console.log(xhr);
      }
    });
}