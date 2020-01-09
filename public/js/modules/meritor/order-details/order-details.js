$(document).ready(function(){
    dataTableApp.addItemsInPageObjListData('isReturnQtyVisible',dataTableObj.config.tableConfig.requestReturn.isReturnQtyVisible);
    dataTableApp.callDataTable(function(){
        afterDataTable();
    });

    function afterDataTable(){
        var returnQtyHeaderConfig = {
                "className":"return-qty",
                "title":"Return Qty",
                "operationType": "NA",
                "keyName": "",
                "sorting": false
        };

        var detailsData = dataTableObj.listArray[0];
        var detailsObj = {
            "detailsData": detailsData
        }
        var detailPageHeaderHtml = detailPageHeader(detailsObj);
        $('#detail-page-header').html(detailPageHeaderHtml);

        $('.request-return').click(function(event){
            dataTableObj.config.headerConfig.push(returnQtyHeaderConfig);
            dataTableObj.config.tableConfig.isExtraColumn = true;
            dataTableObj.config.tableConfig.requestReturn.isReturnQtyVisible = true;
            dataTableApp.addItemsInPageObjListData('isReturnQtyVisible',dataTableObj.config.tableConfig.requestReturn.isReturnQtyVisible);

            dataTableApp.callDataTable(function(){
                afterDataTable();
            });
            event.preventDefault();
        });

        $('.submit-request-return').click(function(event){
            preRemoveExtraColumn();
            dataTableApp.callDataTable(function(){
                afterDataTable();
            });
            event.preventDefault();
        });

        $('.cancel-request-return').click(function(event){
            preRemoveExtraColumn();
            dataTableApp.callDataTable(function(){
                afterDataTable();
            });
            event.preventDefault();
        })
    }

    function preRemoveExtraColumn(){
        dataTableObj.config.headerConfig.pop();
        dataTableObj.config.tableConfig.isExtraColumn = false;
        dataTableObj.config.tableConfig.requestReturn.isReturnQtyVisible = false;
        dataTableApp.addItemsInPageObjListData('isReturnQtyVisible',dataTableObj.config.tableConfig.requestReturn.isReturnQtyVisible);
    }
});