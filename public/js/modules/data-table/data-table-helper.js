var tableWrapper, tableHeader, tableList, columnList, tablePagination, tableStatusPopup, detailPageHeader;

function loadCombinedPartials(done){
    $.get(dataTableObj.partialsPath, function (data) {
      var $content = $($.parseHTML(data));
          $tableWrapper = $content.filter("#tableWrapper").html(),
          $tableHeader = $content.filter("#tableHeader").html(),
          $tableList = $content.filter("#tableList").html(),
          $columnList = $content.filter("#columnList").html(),
          $tablePagination = $content.filter("#tablePagination").html(),
          $tableStatusPopup = $content.filter("#tableStatusPopup").html(),
          $detailPageHeader = $content.filter("#detailPageHeader").html(),

          tableWrapper = Handlebars.compile($tableWrapper);
          tableHeader = Handlebars.compile($tableHeader);
          tableList = Handlebars.compile($tableList);
          columnList = Handlebars.compile($columnList);
          tablePagination = Handlebars.compile($tablePagination);
          
          if($tableStatusPopup){
            tableStatusPopup = Handlebars.compile($tableStatusPopup);
          }

          if($detailPageHeader){
            detailPageHeader = Handlebars.compile($detailPageHeader);
          }
          
          done();
    },'html');
}

Handlebars.registerHelper('ifEq', function(v1, v2, options) {
  if(v1 && v2){
    if(typeof(v1) == "number"){
      v1 = '"'+v1+'"';
    }
    if(typeof(v2) == "number"){
      v2 = '"'+v2+'"';
    }
    v1 = v1.toLowerCase();
    v2 = v2.toLowerCase();
    if(v1 == v2) {
      // console.log(v1,v2,' equal values');
      return options.fn(this);
    }else{
      // console.log(v1,v2,' not equal values');
      return options.inverse(this);
    }
  }
  return options.inverse(this);
});


Handlebars.registerHelper('formattedDate', function(v1, options) {
  if(v1){
      var rawDate = v1;
      var year = rawDate.substring(0,4);
      var month = rawDate.substring(4,6);
      var date = rawDate.substring(6,8);
      return month+"/"+date+"/"+year
  }
  return "";  
});

Handlebars.registerHelper('checkIsSelected', function(v1, arr, options) {
    if(!arr){
      return "";
    }
    var index = arr.indexOf(v1);
    if (index > -1) {
       return "checked"
    }
});

Handlebars.registerHelper('dynamicKeys', function(obj, key, options) {
  if(obj.hasOwnProperty(key)){
    return obj[key]
  }
  return "";
});

Handlebars.registerHelper('processCreditInfoUrl', function(name, url, options) {
  if(name && url){
      var linkNameArr = name.split(',');
      var urlArr = url.split(',');
      var html = "";
      for(var i = 0; i< linkNameArr.length; i++){
        html +="<p><a target='_blank' href="+urlArr[i]+">"+linkNameArr[i]+"</a></p>"
      }

      return html;
  }
  if(name){
      var linkNameArr = name.split(',');
      var html = "";
      for(var i = 0; i< linkNameArr.length; i++){
        html +="<p>"+linkNameArr[i]+"</p>";
      }

      return html;
  }
  return "";
});

Handlebars.registerHelper('isEmpty', function(v1, v2, options) {
  if(v1 == v2 || v1 == undefined) {
    return options.inverse(this);
  }else{
    return options.fn(this);
  }
});

Handlebars.registerHelper('initialSelectedText', function(keyName, options) {
    if(keyName){
      if(dataTableObj.config.tableConfig.advanceSearchTxt == "New Search"){
        return dataTableObj.SHIP_TO_ADV;
      }
    }
    return "";
});
