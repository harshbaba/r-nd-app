var orderNotificationsData = [
    {
        "NOTI_DT": "20190505000000",
        "SHIP_TO": "F412345",
        "NOTI_ALERT": "Order Shipped",
        "ORDNUM": "9021111",
        "CUST_PO": "12345"
    },
    {
        "NOTI_DT": "20190505000000",
        "SHIP_TO": "F412345",
        "NOTI_ALERT": "Order Shipped",
        "ORDNUM": "9021111",
        "CUST_PO": "12345"
    },
    {
        "NOTI_DT": "20190505000000",
        "SHIP_TO": "F412345",
        "NOTI_ALERT": "Order Shipped",
        "ORDNUM": "9021111",
        "CUST_PO": "12345"
    }
];

var dataTableObj= {
    partialsPath: "/partials/modules/meritor/order-notifications/order-notifications-combined-partials.html",
    listArray : orderNotificationsData,
    previousPage: "",
    datePickerConfig:{
      "fromCalenderDateStr"  : "2018-06-30",
      "toCalenderDateStr"    : "2019-06-24"  
    },
    config: {
             "pageSize": 10,
             "pageId": 1,
             "currentSortType":"asc",
             "currentSortKey":"", 
             "isExpandDateButton": true,                      
             "tableConfig":{
                 "tableId":"order-notifications-table",
                 "tableClass":"order-notifications-data-table",
                 "rootClass":"order-notifications",
                 "headerTitle":"Order Notifications",
                 "subTitle":"",
                 "advanceSearchTxt":"Advanced Search",
                 "loadingImgPath" : "",
                 "colLayout": 10,
             },                   
             "headerConfig": orderNotificationsHeaderConfig
            },
    pdfURL : ""
}