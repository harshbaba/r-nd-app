$(document).ready(function(){
    //callDataTable(function(){});
    dataTableApp.callDataTable(function(){
        afterDataTable();
    });

    
    function afterDataTable(){
        $('#per-page-options').on('change', function(){
            var value = $(this).val();
            dataTableObj.config.pageSize = value;
            dataTableApp.callDataTable(function(){
                afterDataTable();
            });
        });
    }
});