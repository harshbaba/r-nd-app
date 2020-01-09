$(document).ready(function(){

    var orderHistoryPageObj = {
        "methods": {},
        "events": {}
    };
    
    orderHistoryPageObj.methods = {
        "setActiveOnTab": function(){
            var tabLevel = dataTableObj.tabLevel;
            $('.display-by-list').find('li').removeClass('active');
            $('.display-by-list').find('li[tab-level="'+tabLevel+'"]').addClass('active');
        }
        
    },

    //my code (will not commit)
    orderHistoryPageObj.events = {
        "changeTabEvents": function(){
            $('.display-by-list > li > a').click(function(event){
                if($(this).parent('li').hasClass('active')) return false;
                showPageLoader();
                var tabLevel = $(this).parent('li').attr('tab-level');
                dataTableObj.tabLevel = tabLevel;
                dataTableObj.config.headerConfig = orderHistoryHeaderConfig[tabLevel];
                dataTableObj.listArray = ordersHistoryData[tabLevel];
                dataTableApp.addItemsInPageObjListData('tabLevel',dataTableObj.tabLevel);

                setTimeout(function(){
                    dataTableApp.callDataTable(function(){
                        hidePageLoader();
                        orderHistoryPageObj.methods.setActiveOnTab();
                        orderHistoryPageObj.events.changeTabEvents();
                    });
                },1200);
                
                event.preventDefault();
            })
        }
    }
    
    dataTableApp.addItemsInPageObjListData('tabLevel',dataTableObj.tabLevel);
    dataTableApp.callDataTable(function(){
        orderHistoryPageObj.methods.setActiveOnTab();
        orderHistoryPageObj.events.changeTabEvents();
    });
    
});
 
// $(document).ready(function(){    
//     dataTableApp.addItemsInPageObjListData('tabLevel',dataTableObj.tabLevel);
//     dataTableApp.callDataTable(function(){
    	
//     	$('.advance-search-button').on('click', function(){
//     		dataTableApp.closeToggles();
//     		returnOpenAdvanceSearchPopUp();
//     	}); 

	

// 		$('.previous-button').on('click', function(){
// 			location.href=dataTableObj.previousPage;
//         }); 
        
//         setColorForEachRow();
//     });

//     function setColorForEachRow(){
//         var liLength = $('#table-list > li').length;
//         for(var i = 0; i< liLength;i++){
//            var currLi =  $('#table-list > li:nth("'+i+'")');
//             if(i == 0){
//                 currLi.addClass('white');
//             }

//             if(currLi.prev('li').hasClass('white')){
//                 if(currLi.hasClass('child')){
//                     currLi.addClass('white');
//                 }else{
//                     currLi.addClass('lgray');
//                 }
//             }

//             if(currLi.prev('li').hasClass('lgray')){
//                 if(currLi.hasClass('child')){
//                     currLi.addClass('lgray');
//                 }else{
//                     currLi.addClass('white');
//                 }
//             }
//         }
//     }
// }); 
 
