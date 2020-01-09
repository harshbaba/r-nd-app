var config,methods,events,html,originalData, dataList;
$(document).ready(function(){
    config = dataTableObj.config

    var selectedShipToCodes = [];

    methods = {
        "getListDataByPageId": function(data){
            //sort data
            var sortedData = methods.sortData(data, config.currentSortKey, config.currentSortType);

            var initialData = [];
            var offset = (config.pageId - 1)*config.pageSize;

            for(var i = offset; i< config.pageSize*config.pageId && i < sortedData.length; i++){
                initialData.push(sortedData[i]);
            }

            
            return initialData;
        },

        "filterDataBySubstring": function(data, searchKey, subString){
            var filteredData = [];
            for(var i =0; i< data.length; i++){
            	var str = data[i][searchKey];
            	if(!str) str = "";
                if(str.toLowerCase().indexOf(subString.toLowerCase()) !== -1){
                    filteredData.push(data[i]);
                }
            }

            return filteredData;
        },

        "filterDataBySelectedIdArray": function(data, searchKey, selectedIdArr){
            var filteredData = [];
            for(var i =0; i< data.length; i++){
            	var str = data[i][searchKey];
                if(!str) str = "";
                var index =  _.indexOf(selectedIdArr, str);
                if(index !== -1){
                    filteredData.push(data[i]);
                }
            }
            return filteredData;
        },

        "filterDataBetweenDates": function(data, fromDate, toDate, keyName){
            fromDate = methods.convertToRawDate(fromDate);
            toDate = methods.convertToRawDate(toDate);
            
            var filteredData = _.filter(data, function(obj){ 
                if(fromDate <= obj[keyName] && toDate >= obj[keyName] ) 
                {
                    return obj; 
                }
            });
            console.log(filteredData);
            return filteredData;
        },

        "getOriginalData": function(){
           return dataTableObj.listArray
        },

        "createPaginationData": function(){
            var paginationData = {
                "pageList":[],
                "willShowPrevButton": false,
                "willShowNextButton": false,
                "paginationLength": "",
                "currentPageId": config.pageId
            };

            var dataLength = dataList.length;
            if(dataLength == 0) return paginationData;

            var checkDataRemainder = dataLength % config.pageSize;
            var paginationLength = parseInt(dataLength / config.pageSize);
            if(checkDataRemainder !== 0) paginationLength++;
            paginationData.paginationLength = paginationLength;

            //first case if only one page
            if(paginationLength == 1){
                return paginationData;
            } 

            //handle next prev button
            if(paginationData.currentPageId != 1){
                paginationData.willShowPrevButton = true;
            }
            
            if(paginationData.currentPageId != paginationData.paginationLength){
                paginationData.willShowNextButton = true;
            }

            //second case if there will be five page
            if(paginationLength < 6){
                for(var i = 0; i< paginationData.paginationLength; i++){
                    paginationData.pageList.push(i+1);
                }
                return paginationData;
            }

            //third case if there will be more than five page
            //suppose page id is 1 then 1&2..lastPage
            if(paginationData.currentPageId == 1){
                paginationData.pageList.push(1);
                paginationData.pageList.push(2);
                paginationData.pageList.push('...');
                paginationData.pageList.push(paginationLength);
            }

            //suppose page id is 2 then 1&2&3..lastPage
            if(paginationData.currentPageId == 2){
                paginationData.pageList.push(1);
                paginationData.pageList.push(2);
                paginationData.pageList.push(3);
                paginationData.pageList.push('...');
                paginationData.pageList.push(paginationLength);
            }

            //suppose page id is 3 then 1&2&3&4..lastPage
            if(paginationData.currentPageId == 3){
                paginationData.pageList.push(1);
                paginationData.pageList.push(2);
                paginationData.pageList.push(3);
                paginationData.pageList.push(4);
                paginationData.pageList.push('...');
                paginationData.pageList.push(paginationLength);
            }

            //suppose page id is greater than 3 then 1..3&4&5..lastPage
            if(paginationData.currentPageId > 3){
                paginationData.pageList.push(1);
                paginationData.pageList.push('...');
                paginationData.pageList.push(paginationData.currentPageId-1);
                paginationData.pageList.push(paginationData.currentPageId);

                if(paginationData.currentPageId != paginationLength){
                    paginationData.pageList.push(paginationData.currentPageId+1);
                }
                if(paginationData.currentPageId <= (paginationLength-3)){
                    paginationData.pageList.push('...');
                }
                if(paginationData.currentPageId <= (paginationLength-2)){
                    paginationData.pageList.push(paginationLength);
                }
                
            }        

            return paginationData;
            
        },

        "sortData": function(data, sortKey, sortType){
            
            var sortedData = _.sortBy(data, sortKey);
            if(sortType == "desc") sortedData = sortedData.reverse();
            console.log(sortedData);
            return sortedData;
        },
        
        "getColumnListArr": function(colKey){
            var data = methods.getOriginalData();
            var columnListArr = _.pluck(data, colKey);
            columnListArr = _.uniq(columnListArr);
            return columnListArr;
        },

        "loadFilteredData": function(filteredData){

            //assign this filtered data to dataList
            dataList = filteredData;

            //reset pageId
            config.pageId = 1;

            //Now we will apply limit to sperate only page data
            html.loadTableList(methods.getListDataByPageId(dataList));
            
        },

        "closeToggles": function(){
            $('.list-box-wrapper, .date-box-wrapper').slideUp();
        },

        "convertToRawDate": function(date){
            var dateArr = date.split('/');
            return dateArr[2]+dateArr[0]+dateArr[1];
        },

        "writeShipToCodesInHeader": function(){
            var shipToCodesString = "";
            for(var i = 0; i< selectedShipToCodes.length; i++){
                var code = selectedShipToCodes[i].split('-');
                code = code[code.length - 1];
                shipToCodesString+= code;
                if(i < selectedShipToCodes.length - 1){
                    shipToCodesString+=", "
                }
            }
            $('.shipto-codes-text').html(shipToCodesString);
        },

        "writeFromToCodeInHeader": function(selectedFromDate, selectedToDate){
            var dateHeaderText = selectedFromDate+"-"+selectedToDate;
            $('.fromto-dates-text').html(dateHeaderText);
        },
        "resetDatePickerDates": function(){
            var dateConfigObj = dataTableObj.datePickerConfig; 
            var fromDateCalenderStartDate   =   new Date(dateConfigObj.fromCalenderDateStr);
            var toDateCalenderStartDate     =  new Date(dateConfigObj.toCalenderDateStr);
            dateConfigObj.fromDateCalender.selectDate(fromDateCalenderStartDate);
            dateConfigObj.toDateCalender.selectDate(toDateCalenderStartDate);
            methods.writeFromToCodeInHeader(dateConfigObj.fromStartDateFormatted, dateConfigObj.toStartDateFormatted);
        }

    }

    events = {
        "loadTableWrapperEvents": function(){
            $('.clear-search-button').click(function(){

                $('.search-box-ind input[type="text"]').val('');

                selectedShipToCodes = [];
                $('.shipto-codes-text').html('');

                if(dataTableObj.isDatePickerExist){
                    methods.resetDatePickerDates();
                }
                
                //reset pageId
                config.pageId = 1;
                dataList = methods.getOriginalData();
                html.loadTableList(methods.getListDataByPageId(dataList));
            }); 
        },
        "loadPaginationEvents": function(){
            $('.pagination-list > li > span.page-id-btn').click(function(){
                config.pageId = parseInt($(this).attr('data-pageid'));
                html.loadTableList(methods.getListDataByPageId(dataList));
            });

            $('.pagination-list > li > span.prev-btn').click(function(){
                config.pageId--;
                html.loadTableList(methods.getListDataByPageId(dataList));
            });

            $('.pagination-list > li > span.next-btn').click(function(){
                config.pageId++;
                html.loadTableList(methods.getListDataByPageId(dataList));
            });
        },
        "loadHeaderEvents": function(){

            //to open search text box
            $('.search-icon').click(function(){
                $(this).next('.search-box-ind').slideToggle();
                $('.list-box-wrapper').slideUp();
                $(this).next('.search-box-ind').find('input[type="text"]').focus();
            });

            $('.list-icon').click(function(){
                $(this).next('.list-box-wrapper').slideToggle();
                var colKey = $(this).attr('data-colkey');
                var listBoxId = $(this).attr('data-listBoxId');
                var columnListArr = methods.getColumnListArr(colKey);
                var colListData = {
                    "columnListArr"     : columnListArr,
                    "selectedCodes"     : selectedShipToCodes,
                }
                html.loadColumnList(listBoxId,colListData);
            });
            
            //for detect typing in search text box
            $('.search-box-ind > input[type="text"]').keyup(function(){
                var subString = $(this).val();
                if(subString){
                    var searchKey  = $(this).attr('data-searchkey');
                    var filteredData = methods.filterDataBySubstring(originalData, searchKey, subString);
                    methods.loadFilteredData(filteredData);
                }else{
                    //reset pageId
                    config.pageId = 1;
                    dataList = methods.getOriginalData();
                    html.loadTableList(methods.getListDataByPageId(dataList));
                }
            });

            //sorting event
            $('.table-header-ind > .table-col > h3.sorting-title').click(function(){
                var appliedSorting = $(this).attr('data-appliedSorting');

                if(appliedSorting != ""){
                    if(appliedSorting == "asc"){
                        config.currentSortType = "desc";

                        $(this).attr('data-appliedsorting','desc');
                        $(this).parent('.table-col').addClass('desc').removeClass('asc');
                    }else{
                        config.currentSortType = "asc";

                        $(this).attr('data-appliedsorting','asc');
                        $(this).parent('.table-col').addClass('asc').removeClass('desc');
                    }
                }else{
                    config.currentSortType = "asc";
                    config.currentSortKey = $(this).parent('.table-col').attr('data-colKeyName');

                    $('h3.sorting-title').attr('data-appliedsorting','');
                    $('.table-col').removeClass('asc desc');
                    $(this).parent('.table-col').addClass('asc');
                    $(this).attr('data-appliedsorting','asc');
                }
                
                //html.loadTableHeader();
                html.loadTableList(methods.getListDataByPageId(dataList));
            });
            
            if(dataTableObj.isDatePickerExist){
                events.loadDatePickerEvents();
            }
            
        },
        "loadColumnListEvents": function(){

            $('#shipcodes-filter-btn').click(function(){
                selectedShipToCodes = [];
                $(this).parents('.list-box-wrapper').slideToggle();
                var keyName = $(this).parents('.list-box-wrapper').prev('.list-icon').attr('data-colkey');

                $('.list-ind input').each(function(){
                    if ($(this).prop('checked')) {
                        selectedShipToCodes.push($(this).val());
                    }
                });
                
                if(selectedShipToCodes.length !== 0){
                    var filteredData = methods.filterDataBySelectedIdArray(originalData, keyName, selectedShipToCodes);
                    methods.loadFilteredData(filteredData);
                }else{
                    //reset pageId
                    config.pageId = 1;
                    dataList = methods.getOriginalData();
                    html.loadTableList(methods.getListDataByPageId(dataList));
                }

                methods.writeShipToCodesInHeader();
            });


            $('#shipcodes-clearall-btn').click(function(){
                $('.list-ind > input').prop('checked', false);
            });

        },

        "loadDatePickerEvents": function(event){
            var colKey = "";
            $('.date-icon').click(function(){
                colKey = $(this).attr('data-colkey');
                $('.date-box-wrapper').slideToggle();
                event.preventDefault();
            });

            $('#close-date-picker').click(function(event){
                $('.date-box-wrapper').slideUp();
                event.preventDefault();
            });

            $('#date-advance-search-btn').click(function(){
                $('.advance-search-button').trigger('click');
            });

            //initializing date picker
            var selectedFromDate = "";
            var selectedToDate = "";

            
            var fromDateCalenderStartDate   =   new Date(dataTableObj.datePickerConfig.fromCalenderDateStr);
            var toDateCalenderStartDate     =  new Date(dataTableObj.datePickerConfig.toCalenderDateStr);
       

            $('#from-date-calender').datepicker({
                language: 'en',
                minDate: fromDateCalenderStartDate,
                maxDate: toDateCalenderStartDate,
                startDate: fromDateCalenderStartDate
            });

            $('#to-date-calender').datepicker({
                language: 'en',
                minDate: fromDateCalenderStartDate,
                maxDate: toDateCalenderStartDate,
                startDate: toDateCalenderStartDate
            });

            var fromDateCalender = $('#from-date-calender').datepicker().data('datepicker');
            var toDateCalender = $('#to-date-calender').datepicker().data('datepicker');

            fromDateCalender.update({
                onSelect: function(formattedDate, date, inst){
                    selectedFromDate = formattedDate;
                    toDateCalender.selectDate(new Date(dataTableObj.datePickerConfig.toCalenderDateStr));
                    toDateCalender.update('minDate', date);
                }
            });

            toDateCalender.update({
                onSelect: function(formattedDate, date, inst){
                    selectedToDate = formattedDate;
                }
            });

            fromDateCalender.selectDate(fromDateCalenderStartDate);
            toDateCalender.selectDate(toDateCalenderStartDate);

            $('#date-submit-btn').click(function(){
                methods.writeFromToCodeInHeader(selectedFromDate, selectedToDate);
                var filteredData = methods.filterDataBetweenDates(originalData, selectedFromDate,selectedToDate, colKey);
                $('.date-box-wrapper').slideUp();
                methods.loadFilteredData(filteredData);
            });

            //append important data to main object
            dataTableObj.datePickerConfig.fromDateCalenderStartDate = fromDateCalenderStartDate;
            dataTableObj.datePickerConfig.toDateCalenderStartDate = toDateCalenderStartDate;
            dataTableObj.datePickerConfig.fromDateCalender = fromDateCalender;
            dataTableObj.datePickerConfig.toDateCalender = toDateCalender;

            dataTableObj.datePickerConfig.fromStartDateFormatted = selectedFromDate;
            dataTableObj.datePickerConfig.toStartDateFormatted = selectedToDate;
            
            methods.writeFromToCodeInHeader(selectedFromDate, selectedToDate);
        }
    }

    html = {
        "loadTableWrapper": function(){
            var tableWrapperHtml = tableWrapper(config.tableConfig);
            $('#data-table-placeholder').html(tableWrapperHtml);
            events.loadTableWrapperEvents();
        },
        "loadTableHeader": function(){
            var tableHeaderHtml = tableHeader(config);
            $('#table-header').html(tableHeaderHtml);
            events.loadHeaderEvents();
        },
        "loadTableList": function(data){
        	var listData = {
        			"data": data,
                    "pdfUrl": dataTableObj.pdfURL,
                    "headerConfig": dataTableObj.config.headerConfig
            }
            methods.closeToggles();
            var tableListHtml = tableList(listData);
            $('#table-list-wrapper').html(tableListHtml);
            html.loadPaginationList();
        },
        "loadColumnList": function(listBoxId,data){
            var loadColumnListHtml = columnList(data);
            $('#'+listBoxId).html(loadColumnListHtml);
            events.loadColumnListEvents();
        },
        "loadPaginationList": function(){
            
            var tablePaginationHtml = tablePagination(methods.createPaginationData());
            $('.table-pagination-wrap').html(tablePaginationHtml);
            events.loadPaginationEvents();
        }
    }
    
});

function callDataTable(callback){
    loadCombinedPartials(function(){

        //initialize page id 1
        dataTableObj.config.pageId = 1;

    	originalData = methods.getOriginalData();
        dataList = methods.getOriginalData();
        
        html.loadTableWrapper();

        html.loadTableHeader();

        html.loadTableList(methods.getListDataByPageId(dataList));
        callback();
    });
}