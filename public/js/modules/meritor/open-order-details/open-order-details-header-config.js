var openOrderDetailsHeaderConfig = [
   {
      "className":"meritor-part",
      "title":"Meritor Part",
      "operationType": "search",
      "keyName": "MTOR_PART",
      "sorting": true
  },
   {
      "className":"customer-po",
      "title":"PO Item",
      "operationType": "search",
      "keyName": "CUST_PO",
      "sorting": true
  },
  {
       "className":"request-date",
       "title":"Customer request Date",
       "operationType": "NA",
       "keyName": "REQ_DT",
       "sorting": false
   },
   {
      "className":"qty-ordered",
      "title":"Qty Ordered",
      "operationType": "NA",
      "keyName": "ORD_QTY",
      "sorting": false
   },
   {
      "className":"line-qty",
      "title":"Line Qty. Open",
      "operationType": "NA",
      "keyName": "DTL_QTY",
      "sorting": false
   },
  {
      "className":"promise-date",
      "title":"Promise Date",
      "operationType": "fromToDate",
      "keyName": "PROM_DT",
      "sorting": true
  },
  {
      "className":"revised-promise-date",
      "title":"Revised Promise Date",
      "operationType": "fromToDate",
      "keyName": "REV_PROM_DT",
      "fromDateKeyName":"fromCalenderDateStrRev",
      "toDateKeyName":  "toCalenderDateStrRev",
      "sorting": true
   },
   {
      "className":"status",
      "title":"Line Item Status",
      "operationType": "status",
      "keyName": "DTL_STATUS",
      "sorting": true
   },
];