$(document).ready(function(){
    $('#openCheckList').click(function(){
        dataTableObj.listArray = returnData;
        // callDataTable(function(){});
        dataTableApp.callDataTable(function(){});
    });
});