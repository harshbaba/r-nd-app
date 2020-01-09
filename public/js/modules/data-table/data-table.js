var dataTableApp = (function($){

    var config, methods, events, html, originalData, dataList, pageObj;
    $(document).ready(function(){

        config = dataTableObj.config
        pageObj = {
            "listData":{
                "data": "",
                "pdfUrl": dataTableObj.pdfURL,
                "headerConfig": dataTableObj.config.headerConfig
            },
            "showListOptions":[],
            "fromToDateOptions":[],
            "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
        };

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
                    var dateInd = obj[keyName].slice(0,8);
                    if(fromDate <= dateInd && toDate >= dateInd ) 
                    {
                        return obj; 
                    }
                });
                
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

            "writeSelectedOptionsInHeader": function(selectedOptions, listBoxId){

                var optionsString = "";
                for(var i = 0; i< selectedOptions.length; i++){
                    var code = selectedOptions[i].split('-');
                    code = code[code.length - 1];
                    optionsString+= code;
                    if(i < selectedOptions.length - 1){
                        optionsString+=", "
                    }
                }
                $('#'+listBoxId).siblings('.selected-options-text').html(optionsString);
            },

            "writeFromToDateInHeader": function(textBoxId, selectedFromDate, selectedToDate){
                var dateHeaderText = selectedFromDate+" - "+selectedToDate;
                $('#'+textBoxId).html(dateHeaderText);
            },
            
            "resetDatePickerDates": function(){
                var dateConfigObj = dataTableObj.datePickerConfig;
                

                for(var i = 0; i< pageObj.fromToDateOptions.length; i++){

                    
                    var ind = pageObj.fromToDateOptions[i];

                    if(dateConfigObj[ind.fromDateKeyName] == "" || dateConfigObj[ind.toDateKeyName] == ""){
                        continue;
                    }

                    var startDatesObj = methods.getStartFormattedDates(ind.fromDateKeyName, ind.toDateKeyName);
                    var keyName = ind.keyName;
                    var indDate = ind.dates;

                    //var fullFromDateString = new Date(dateConfigObj[ind.fromDateKeyName]+"T12:00:00Z").toLocaleString("en-US", {timeZone: pageObj.timeZone});   
                    //var fullToDateString = new Date(dateConfigObj[ind.toDateKeyName]+"T12:00:00Z").toLocaleString("en-US", {timeZone: pageObj.timeZone});
                    var fullFromDateString = new Date(dateConfigObj[ind.fromDateKeyName]+"T12:00:00Z");
                    var fullToDateString = new Date(dateConfigObj[ind.toDateKeyName]+"T12:00:00Z")

                    indDate.fromDateCalender.selectDate(new Date(fullFromDateString));
                    
                    indDate.toDateCalender.selectDate(new Date(fullToDateString));
                    if(!ind.initialHide){
                        methods.writeFromToDateInHeader("dates-text"+keyName, startDatesObj.fromDate, startDatesObj.toDate);
                    }
                    
                } 
            },

            "getStartFormattedDates": function(fromDateKeyName,toDateKeyName){
                var dateObj = dataTableObj.datePickerConfig;
                var formattedObj = {};

                var fromDate = dateObj[fromDateKeyName].split('-');
                fromDate = fromDate[1]+'/'+fromDate[2]+'/'+fromDate[0];

                var toDate = dateObj[toDateKeyName].split('-');
                toDate = toDate[1]+'/'+toDate[2]+'/'+toDate[0];

                formattedObj.fromDate = fromDate;
                formattedObj.toDate = toDate;
                return formattedObj;
            },

            "createSearchQuery": function(){
                var queryArr = [];
                $('.search-box-ind > input[type="text"]').each(function(){
                    if($(this).val() != ""){
                        var queryObj = {
                            "filterKey": $(this).attr('data-searchkey'),
                            "subString": $(this).val(),
                            "filterType": "search"
                        }
                        queryArr.push(queryObj);
                    }
                });
                
                if(pageObj.showListOptions.length > 0){

                    for(var i = 0; i< pageObj.showListOptions.length; i++){
                        if(pageObj.showListOptions[i].selectedOptions.length > 0){
                            var queryObj = {
                                "filterKey": pageObj.showListOptions[i].keyName,
                                "selectedCodes": pageObj.showListOptions[i].selectedOptions,
                                "filterType": "select"
                            }
                            queryArr.push(queryObj);
                        }
                    }
                }

                if(pageObj.fromToDateOptions.length > 0){
                    for(var i = 0; i< pageObj.fromToDateOptions.length; i++){
                        var queryObj = {
                            "filterKey": pageObj.fromToDateOptions[i].keyName,
                            "fromDate": pageObj.fromToDateOptions[i].dates.fromSelectedDateApplied,
                            "toDate": pageObj.fromToDateOptions[i].dates.toSelectedDateApplied,
                            "filterType": "dateRange"
                        }
                        if( queryObj.fromDate && queryObj.toDate){
                            queryArr.push(queryObj);
                        }
                        
                    }
                    
                }
                return queryArr;

            },

            "makeFullSearch": function(filterRequestArr){
                var filteredData = originalData;
                for(var i = 0; i< filterRequestArr.length; i++){
                    
                    var filterReqInd = filterRequestArr[i];

                    //first case of filter based on substring
                    if(filterReqInd.filterType == "search"){
                        filteredData = methods.filterDataBySubstring(filteredData, filterReqInd.filterKey, filterReqInd.subString);
                    }

                    //second case of filter based on selection
                    if(filterReqInd.filterType == "select"){
                        filteredData = methods.filterDataBySelectedIdArray(filteredData, filterReqInd.filterKey, filterReqInd.selectedCodes);
                    }

                    //third case of filter based on dateRange
                    if(filterReqInd.filterType == "dateRange"){
                        filteredData = methods.filterDataBetweenDates(filteredData, filterReqInd.fromDate, filterReqInd.toDate, filterReqInd.filterKey);
                    }

                }
                return filteredData;
            },

            "storeHeaderOperations": function(headerConfig){
                for(var i = 0; i< headerConfig.length; i++){
                    if(headerConfig[i].operationType == "showList"){
                        var showListObj = {
                            "selectedOptions":[],
                            "keyName": headerConfig[i].keyName,
                            "showTextInitially": headerConfig[i].showTextInitially || false
                        }
                        pageObj.showListOptions.push(showListObj);
                    }

                    if(headerConfig[i].operationType == "fromToDate"){
                        var fromToDateObj = {
                            "dates":{},
                            "keyName": headerConfig[i].keyName,
                            "initialHide": headerConfig[i].initialHide,
                            "fromDateKeyName": "fromCalenderDateStr",
                            "toDateKeyName": "toCalenderDateStr"
                        }

                        if(headerConfig[i].hasOwnProperty('fromDateKeyName') && headerConfig[i].hasOwnProperty('toDateKeyName')){
                            fromToDateObj.fromDateKeyName   = headerConfig[i].fromDateKeyName;
                            fromToDateObj.toDateKeyName     = headerConfig[i].toDateKeyName;
                        }
                        pageObj.fromToDateOptions.push(fromToDateObj);
                    }
                }

            },

            "emptySelectedOptions": function(){
                for(var i = 0; i< pageObj.showListOptions.length; i++){
                    pageObj.showListOptions[i].selectedOptions = [];
                }
            },

            "checkTableFixed": function(){
                var overflowWrapperTopPosition = $('.overflow-wrapper').offset().top;
                var windowTopPosition = $(window).scrollTop();
                if(overflowWrapperTopPosition < windowTopPosition){
                    $('.data-table-inner').addClass('fixed-table');
                }else{
                    $('.data-table-inner').removeClass('fixed-table');
                }
            },

            "addItemsInPageObjListData": function(key,value){
                pageObj.listData[key] = value;
            }, 

            "setColorForEachRow": function (){
                var liLength = $('#table-list > li').length;
                for(var i = 0; i< liLength;i++){
                   var currLi =  $('#table-list > li:nth("'+i+'")');
                   var matchingCombCurrent = currLi.attr('data-matchingComb');
                   var matchingCombPrev = currLi.prev('li').attr('data-matchingComb');
                   //console.log(matchingComb);
                    if(i == 0){
                        currLi.addClass('white');
                    }
            
                    if(currLi.prev('li').hasClass('white')){
                        if(currLi.hasClass('child')){
                            if(matchingCombCurrent == matchingCombPrev){
                                currLi.addClass('white visiblehide');
                            }
                            else{
                                currLi.addClass('lgray');
                            }
                            
                        }else{
                            if(currLi.prev('li').hasClass('child')){
                                if(matchingCombCurrent == matchingCombPrev){
                                    currLi.addClass('white visiblehide');
                                }else{
                                    currLi.addClass('lgray');
                                }
                            }else{
                                currLi.addClass('lgray');
                            }
                        }
                    }
            
                    if(currLi.prev('li').hasClass('lgray')){
                        if(currLi.hasClass('child')){
                            if(matchingCombCurrent == matchingCombPrev){
                                currLi.addClass('lgray visiblehide');
                            }
                            else{
                                currLi.addClass('white');
                            }
                            
                        }else{
                            if(currLi.prev('li').hasClass('child')){
                                if(matchingCombCurrent == matchingCombPrev){
                                    currLi.addClass('lgray visiblehide');
                                }else{
                                    currLi.addClass('white');
                                }
                            }else{
                                currLi.addClass('white');
                            }
                        }
                    }
                }
            },

            "checkCalenderLastPage": function(keyName){
                var prevNavSelector = $('#from-date-calender'+keyName).find('[data-action="prev"]');
                if(!prevNavSelector.hasClass('-disabled-')){
                    methods.calenderTriggerPrevClick(keyName);
                }
            },

            "calenderTriggerPrevClick": function(keyName){
                var prevNavSelector = $('#from-date-calender'+keyName).find('[data-action="prev"]');
                prevNavSelector.trigger('click');
                methods.checkCalenderLastPage(keyName);
            }

        }

        events = {
            "loadTableWrapperEvents": function(){
                $('.clear-search-button').click(function(){

                    $('.search-box-ind input[type="text"]').val('');

                    methods.emptySelectedOptions();
                    $('.selected-options-text').html('');

                    if(pageObj.fromToDateOptions.length > 0){
                        methods.resetDatePickerDates();
                    }
                    
                    //reset pageId
                    config.pageId = 1;
                    dataList = methods.getOriginalData();
                    html.loadTableList(methods.getListDataByPageId(dataList));
                });
                
                $('#table-list-wrapper').on('click', '.status-popup-btn', function(event){
                    var popUpDetails = JSON.parse($(this).attr('popup-details'));
                   
                    $('.custom-model').html(''); 
                    var data = {
                        "details": popUpDetails,
                        "imageUrl": dataTableObj.imageUrl
                    }
                    console.log(data);
                    var tableStatusPopupHtml = tableStatusPopup(data);
                    $('.custom-model').html(tableStatusPopupHtml);
                    $('.page-bg').addClass('active');
                    $('.custom-model').addClass('status active');
                    events.loadStatusPopupEvents();
                    event.preventDefault();
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
                    var indexOfshowListOptions = _.findIndex(pageObj.showListOptions, {'keyName': colKey});

                    var colListData = {
                        "columnListArr"     : columnListArr,
                        "selectedCodes"     : pageObj.showListOptions[indexOfshowListOptions].selectedOptions,
                    }
                    html.loadColumnList(listBoxId,colListData);
                });
                
                //for detect typing in search text box
                $('.search-box-ind > input[type="text"]').keyup(function(){

                    var filterRequestArr = methods.createSearchQuery();
                    var filteredData = methods.makeFullSearch(filterRequestArr);
                    methods.loadFilteredData(filteredData);

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
                
                if(pageObj.fromToDateOptions.length > 0){
                    events.loadDatePickerEvents();
                }
                
            },

            "loadColumnListEvents": function(){

                $('.options-filter-btn').click(function(){
                    //$(this).parent('.list-box-wrapper').slideToggle();
                    var keyName = $(this).parents('.list-box-wrapper').prev('.list-icon').attr('data-colkey');
                    var listBoxId = $(this).parents('.list-box-wrapper').prev('.list-icon').attr('data-listboxid');
                    var indexOfshowListOptions = _.findIndex(pageObj.showListOptions, {'keyName': keyName});
                    pageObj.showListOptions[indexOfshowListOptions].selectedOptions = [];

                    $('#'+listBoxId).find('.list-ind input').each(function(){
                        if ($(this).prop('checked')) {
                            pageObj.showListOptions[indexOfshowListOptions].selectedOptions.push($(this).val());
                        }
                    });

                    var filterRequestArr = methods.createSearchQuery();
                    var filteredData = methods.makeFullSearch(filterRequestArr);
                    methods.loadFilteredData(filteredData);
                    methods.writeSelectedOptionsInHeader(pageObj.showListOptions[indexOfshowListOptions].selectedOptions, listBoxId);
                });


                $('.list-box-wrapper .options-clearall-btn').click(function(){
                    $(this).parent('.filter-btn-row').siblings('.list').find('.list-ind > input').prop('checked', false);
                });

            },

            "loadDatePickerEvents": function(){
                $('.date-icon').click(function(event){
                    var dateboxid = $(this).attr('data-dateboxid');
                    $('#'+dateboxid).slideToggle();
                    event.preventDefault();
                });

                $('.close-date-picker').click(function(event){
                    var dateboxid = $(this).attr('data-dateboxid');
                    $('#'+dateboxid).slideUp();
                    event.preventDefault();
                });

                $('.date-advance-search-btn').click(function(){
                    $('.advance-search-button').trigger('click');
                });
                
                
                $('.date-submit-btn').click(function(){
                    
                    var keyName = $(this).attr('data-keyName');
                    var textBoxId = "dates-text"+keyName;
                    var indexOfSelectedDatepicker = _.findIndex(pageObj.fromToDateOptions, {'keyName': keyName});
                    var selectedDateObj = pageObj.fromToDateOptions[indexOfSelectedDatepicker].dates;
                    selectedDateObj.fromSelectedDateApplied = selectedDateObj.tempSelectedFromDate;
                    selectedDateObj.toSelectedDateApplied = selectedDateObj.tempSelectedToDate;
                    
                    $('#datebox'+keyName).slideUp();
                    var filterRequestArr = methods.createSearchQuery();
                    
                    var filteredData = methods.makeFullSearch(filterRequestArr);
                    methods.loadFilteredData(filteredData);
                    methods.writeFromToDateInHeader(textBoxId, selectedDateObj.fromSelectedDateApplied, selectedDateObj.toSelectedDateApplied);

                });

                //initializing date picker
                for(var i = 0; i< pageObj.fromToDateOptions.length; i++){

                    var indDateOpt = pageObj.fromToDateOptions[i];
                    if(dataTableObj.datePickerConfig[indDateOpt.fromDateKeyName] == "" || dataTableObj.datePickerConfig[indDateOpt.toDateKeyName] == ""){
                        console.log(indDateOpt.keyName);
                        $('.date-icon[data-colKey="'+indDateOpt.keyName+'"]').hide();
                        continue;
                    }

                    //var fromDateCalenderStartDate   =   new Date(dataTableObj.datePickerConfig[indDateOpt.fromDateKeyName]+"T12:00:00Z").toLocaleString("en-US", {timeZone: pageObj.timeZone});
                    var fromDateCalenderStartDate   =   new Date(dataTableObj.datePickerConfig[indDateOpt.fromDateKeyName]+"T12:00:00Z");
                    fromDateCalenderStartDate = new Date(fromDateCalenderStartDate);
                    var toDateCalenderStartDate     =  new Date(dataTableObj.datePickerConfig[indDateOpt.toDateKeyName]+"T12:00:00Z");
                    //var toDateCalenderStartDate     =  new Date(dataTableObj.datePickerConfig[indDateOpt.toDateKeyName]+"T12:00:00Z").toLocaleString("en-US", {timeZone: pageObj.timeZone});
                    toDateCalenderStartDate = new Date(toDateCalenderStartDate);
                    
                    var selectedFormattedDate = "";

                    indDateOpt.dates.tempSelectedFromDate = "";
                    indDateOpt.dates.tempSelectedToDate = "";
                    
                    indDateOpt.dates.fromDateCalender = $('#from-date-calender'+indDateOpt.keyName).datepicker().data('datepicker');
                    indDateOpt.dates.toDateCalender = $('#to-date-calender'+indDateOpt.keyName).datepicker().data('datepicker');

                    indDateOpt.dates.fromDateCalender.update({
                        language: 'en',
                        minDate: fromDateCalenderStartDate,
                        maxDate: toDateCalenderStartDate,
                        startDate: fromDateCalenderStartDate,
                        firstDay: 1,
                        onSelect: function(formattedDate, date, inst){
                            //console.log(inst);
                            //console.log($(inst.el).attr('data-keyName'));
                            var keyName = $(inst.el).attr('data-keyName');
                            var indexOfSelectedDatepicker = _.findIndex(pageObj.fromToDateOptions, {'keyName': keyName});
                            var selectedDateObj = pageObj.fromToDateOptions[indexOfSelectedDatepicker].dates;
                
                            selectedFormattedDate = formattedDate;
                            selectedDateObj.tempSelectedFromDate = formattedDate;
                            selectedDateObj.toDateCalender.selectDate(new Date(dataTableObj.datePickerConfig.toCalenderDateStr));
                            selectedDateObj.toDateCalender.update('minDate', date);
                        }
                    });

                    
                    indDateOpt.dates.fromDateCalender.selectDate(fromDateCalenderStartDate);
                    indDateOpt.dates.fromSelectedDateApplied = selectedFormattedDate;
                    
                    indDateOpt.dates.toDateCalender.update({
                        language: 'en',
                        minDate: fromDateCalenderStartDate,
                        maxDate: toDateCalenderStartDate,
                        startDate: toDateCalenderStartDate,
                        firstDay: 1,
                        onSelect: function(formattedDate, date, inst){
                            var keyName = $(inst.el).attr('data-keyName');
                            var indexOfSelectedDatepicker = _.findIndex(pageObj.fromToDateOptions, {'keyName': keyName});
                            var selectedDateObj = pageObj.fromToDateOptions[indexOfSelectedDatepicker].dates;
                            selectedFormattedDate = formattedDate;
                            selectedDateObj.tempSelectedToDate = formattedDate;
                        }
                    });

                    
                    indDateOpt.dates.toDateCalender.selectDate(toDateCalenderStartDate);
                    indDateOpt.dates.toSelectedDateApplied = selectedFormattedDate;
                    
                    if(!indDateOpt.initialHide){
                        methods.writeFromToDateInHeader("dates-text"+indDateOpt.keyName, indDateOpt.dates.fromSelectedDateApplied, indDateOpt.dates.toSelectedDateApplied);
                    }
                    
                    
                    
                    methods.checkCalenderLastPage(indDateOpt.keyName);
                    
                }

            },

            "loadStatusPopupEvents": function(){
                $('#close-status-popup-btn').click(function(event){
                    $('.page-bg').removeClass('active');
                    $('.custom-model').removeClass('status active');
                    $('.custom-model').html('');
                    event.preventDefault();
                });
            },

        }

        html = {
            "loadTableWrapper": function(){
                config.tableConfig.pageSize = config.pageSize;
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
                pageObj.listData.data = data;
                methods.closeToggles();
                var tableListHtml = tableList(pageObj.listData);
                $('#table-list-wrapper').html(tableListHtml);
                html.loadPaginationList();
                methods.setColorForEachRow();
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
            pageObj.fromToDateOptions = [];

            originalData = methods.getOriginalData();
            dataList = methods.getOriginalData();

            methods.storeHeaderOperations(dataTableObj.config.headerConfig);
            
            html.loadTableWrapper();

            html.loadTableHeader();

            html.loadTableList(methods.getListDataByPageId(dataList));
            methods.checkTableFixed();
        
            $(window).scroll(function(){
                methods.checkTableFixed();
            });
            
            callback();
        });
    }

    return {
        "callDataTable": function(callback){
            callDataTable(callback);
        },
        "addItemsInPageObjListData": function(key,value){
            return methods.addItemsInPageObjListData(key,value);
        },
        "closeToggles": function(){
            return methods.closeToggles();
        }
    }

})(jQuery);


