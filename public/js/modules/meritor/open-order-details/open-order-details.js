$(document).ready(function(){
    dataTableApp.callDataTable(function(){
        var detailsData = dataTableObj.listArray[0];
        var detailsObj = {
            "detailsData": detailsData
        }
        var detailPageHeaderHtml = detailPageHeader(detailsObj);
        $('#detail-page-header').html(detailPageHeaderHtml);
    });
});