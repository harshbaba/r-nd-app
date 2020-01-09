var orderHistoryHeaderConfig = {
    "orderLevel": [
      {
          "className":"order-level-shipto",
          "title":"Meritor Ship To",
          "operationType": "showList",
          "keyName": "SHIP_TO",
          "sorting": true
      },
      {
          "className":"order-level-date-ordered",
          "title":"Date Ordered",
          "operationType": "fromToDate",
          "keyName": "ORD_DT",
          "sorting": true
      },
      {
          "className":"order-level-order-no",
          "title":"Meritor Order Number",
          "operationType": "search",
          "keyName": "ORDNUM",
          "sorting": true
      },
      {
          "className":"order-level-customer-po",
          "title":"Customer PO",
          "operationType": "search",
          "keyName": "CUST_PO",
          "sorting": true
      },
      {
          "className":"order-level-order-status",
          "title":"Order Status",
          "operationType": "showList",
          "keyName": "ORD_STATUS",
          "sorting": true
       },
       {
            "className":"order-level-order-type",
            "title":"Order Type",
            "operationType": "showList",
            "keyName": "ORD_TYPE",
            "sorting": true
        },
        {
            "className":"order-level-view-details",
            "title":"View Details",
            "operationType": "NA",
            "keyName": "NA",
            "sorting": false
        }
    ],
    "itemLevel":[
       {
          "className":"item-level-meritor-part",
          "title":"Meritor Part",
          "operationType": "search",
          "keyName": "MTOR_PART",
          "sorting": true
      },
      {
          "className":"item-level-shipto",
          "title":"Meritor Ship To",
          "operationType": "showList",
          "keyName": "SHIP_TO",
          "sorting": true
      },
      {
            "className":"item-level-date-ordered",
            "title":"Date Ordered",
            "operationType": "fromToDate",
            "keyName": "ORD_DT",
            "sorting": true
        },
      {
          "className":"item-level-order-no",
          "title":"Meritor Order#",
          "operationType": "search",
          "keyName": "ORDNUM",
          "sorting": true
       },
       {
          "className":"item-level-customer-po",
          "title":"Customer PO",
          "operationType": "search",
          "keyName": "CUST_PO",
          "sorting": true
      },
      {
          "className":"item-level-order-type",
          "title":"Order Type",
          "operationType": "showList",
          "keyName": "ORD_TYPE",
          "sorting": true
       },
       {
          "className":"item-level-qty-ordered",
          "title":"Qty <br/>Ordered",
          "operationType": "NA",
          "keyName": "ORD_QTY",
          "sorting": false
       },
       {
          "className":"item-level-line-qty",
          "title":"Line <br/>Item Qty",
          "operationType": "NA",
          "keyName": "DTL_QTY",
          "sorting": false
       },
       {
          "className":"item-level-status",
          "title":"Line Item Status",
          "operationType": "NA",
          "keyName": "DTL_STATUS",
          "sorting": true
       },
    ]
}