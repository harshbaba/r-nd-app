var return_history_data = {
    "returnOrderDetails": [
        {
            "CREDIT_FILENAMES": "http://mpomemo.meritor.com/XPFileServer2/CVA_CMDM/CM_DD110A_CM_252_88110915_2019-05-06.pdf",
            "HDR_STATUS": "Closed",
            "ORDNUM": "",
            "CREDIT_INFO": "87841464",
            "RTN_NO": "86558",
            "SHIP_TO": "W9921A         ",
            "REQ_DT": "20190425000000",
            "REQ_DT2": "20190931000000",
            "RTN_TYPE": "Part"
        },
        {
            "CREDIT_FILENAMES": "http://mpomemo.meritor.com/XPFileServer2/CVA_CMDM/CM_DD110A_CM_252_88110915_2019-05-06.pdf,http://mpomemo.meritor.com/XPFileServer2/CVA_CMDM/CM_DD110A_CM_252_88110915_2019-05-06.pdf,http://mpomemo.meritor.com/XPFileServer2/CVA_CMDM/CM_DD110A_CM_252_88110915_2019-05-06.pdf",
            "HDR_STATUS": "Closed",
            "ORDNUM": "",
            "CREDIT_INFO": "87841464,87841463,87841462",
            "RTN_NO": "86558",
            "SHIP_TO": "W9921A         ",
            "REQ_DT": "20190513000000",
            "REQ_DT2": "20190731000000",
            "RTN_TYPE": "Part"
        }
    ]
};

var dataTableObj = {
    //partialsPath: "${jsAssetsDir}partials/modules/data-table/combined-partials.html",
    
    partialsPath: "/partials/modules/meritor/return/return-history-combined-partials.html",
    listArray: return_history_data.returnOrderDetails,
    config: {
        "pageSize": 10,
        "pageId": 1,
        "currentSortType":"asc",
        "currentSortKey":"RTN_NO",
        "tableConfig":{
            "tableId":"return-history-table",
            "tableClass":"return-history-table",
            "rootClass":"return",
            "headerTitle":"My Returns History - Last 30 Days",
            "colLayout": 7,
        },
        "headerConfig":[
            {
                "className":"return-number",
                "title":"Return Number",
                "operationType": "search",
                "keyName": "RTN_NO",
                "sorting": true
            },
            {
                "className":"shipto",
                "title":"Meritor Ship To",
                "operationType": "showList",
                "keyName": "SHIP_TO",
                "sorting": true
            },
            {
                "className":"date-requested",
                "title":"Date Requested",
                "operationType": "fromToDate",
                "keyName": "REQ_DT",
                "sorting": true
            },
            {
                "className":"reference-number",
                "title":"Reference Number",
                "operationType": "search",
                "keyName": "ORDNUM",
                "sorting": true
            },
            {
                "className":"type",
                "title":"Type",
                "operationType": "showList",
                "keyName": "RTN_TYPE",
                "sorting": false
            },
            {
                "className":"status",
                "title":"Status",
                "operationType": "showList",
                "keyName": "HDR_STATUS",
                "sorting": false
            },
            {
                "className":"credit-note",
                "title":"Credit Note",
                "operationType": "search",
                "keyName": "CREDIT_INFO",
                "sorting": true
            },
        ]
    },
    "isDatePickerExist": true,
    "datePickerConfig":{
        "fromCalenderDateStr"  : "2019-03-15",
        "toCalenderDateStr"    : "2019-05-15"
    }
} 
