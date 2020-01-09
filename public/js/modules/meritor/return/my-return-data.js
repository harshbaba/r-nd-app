var returnData = [  
   {  
      "custPONo":"128513              ",
      "meritorOrderNo":"902704899",
      "orderDate":"20190325000000",
      "shipto":"Lorem ipsum-dolor-DD110A",
      "shipToCode": "DD110A"
   },
   {  
      "custPONo":"128538              ",
      "meritorOrderNo":"902707781",
      "orderDate":"20190328000000",
      "shipto":"Lorem ipsum-dolor-DD110A",
      "shipToCode": "DD110A"
   },
   {  
      "custPONo":"128559              ",
      "meritorOrderNo":"902711255",
      "orderDate":"20190402000000",
      "shipto":"Lorem ipsum-dolor-DD110A",
      "shipToCode": "DD110A"
   },
   {  
      "custPONo":"128559              ",
      "meritorOrderNo":"902711255",
      "orderDate":"20190402000000",
      "shipto":"Lorem ipsum-dolor-DD110A",
      "shipToCode": "DD110A"
   },
   {  
      "custPONo":"128415              ",
      "meritorOrderNo":"902695102",
      "orderDate":"20190311000000",
      "shipto":"Lorem ipsum-dolor-DD110A",
      "shipToCode": "DD110A"
   },
   {  
      "custPONo":"128559              ",
      "meritorOrderNo":"902711255",
      "orderDate":"20190402000000",
      "shipto":"Lorem ipsum-dolor-DD110A",
      "shipToCode": "DD110A"
   }
]

var dataTableObj = {
//partialsPath: "${jsAssetsDir}partials/modules/data-table/combined-partials.html",
//invoiceList : <wcf:json object="${invoiceOrders}"/>
   partialsPath: "/partials/modules/meritor/return/return-combined-partials.html",
   listArray: [],
   config: {
      "pageSize": 10,
      "pageId": 1,
      "currentSortType":"asc",
      "currentSortKey":"INV_NO",
      "tableConfig":{
         "tableId":"return-table",
         "tableClass":"return-data-table",
         "rootClass":"return",
         "headerTitle":"My Returns - Last 30 Days",
         "colLayout": 5,
      },
      "headerConfig":[
            {
                  "className":"shipto",
                  "title":"Meritor Ship To",
                  "operationType": "showList",
                  "keyName": "shipto",
                  "infoType":"text",
                  "sorting": true
            },
            {
                  "className":"date-ordered",
                  "title":"Date Ordered",
                  "operationType": "fromToDate",
                  "keyName": "orderDate",
                  "infoType":"text",
                  "sorting": true
            },
            {
                  "className":"order-no",
                  "title":"Meritor Order Number",
                  "operationType": "search",
                  "keyName": "meritorOrderNo",
                  "infoType":"text",
                  "sorting": true
            },
            {
                  "className":"customer-po",
                  "title":"Customer PO",
                  "operationType": "search",
                  "keyName": "custPONo",
                  "infoType":"text",
                  "sorting": true
            },
            {
               "className":"view-details",
               "title":"View Details",
               "operationType": "NA",
               "keyName": "NA",
               "infoType":"viewDetails",
               "sorting": false
            }
         ]
   },
   "isDatePickerExist": true,
   "datePickerConfig":{
   //"monthCount": 1,
   "fromCalenderDateStr"  : "2018-03-15",
   "toCalenderDateStr"    : "2019-05-15"
   }
} 