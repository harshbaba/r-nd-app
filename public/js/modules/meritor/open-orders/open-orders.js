$(document).ready(function(){
    var openOrderPageObj = {
        "methods": {},
        "events": {}
    };
    
    openOrderPageObj.methods.setActiveOnTab = function(){
        var tabLevel = dataTableObj.tabLevel;
        $('.display-by-list').find('li[tab-level="'+tabLevel+'"]').addClass('active');
    }

    //my code (will not commit)
     openOrderPageObj.events = {
        "changeTabEvents": function(){
            $('.display-by-list > li > a').click(function(event){
                if($(this).parent('li').hasClass('active')) return false;
                showPageLoader();
                var tabLevel = $(this).parent('li').attr('tab-level');
                dataTableObj.tabLevel = tabLevel;
                dataTableObj.config.headerConfig = openOrderHeaderConfig[tabLevel];
                dataTableObj.listArray = openOrdersData[tabLevel];
                dataTableApp.addItemsInPageObjListData('tabLevel',dataTableObj.tabLevel);

                setTimeout(function(){
                    dataTableApp.callDataTable(function(){
                        hidePageLoader();
                        openOrderPageObj.methods.setActiveOnTab();
                        openOrderPageObj.events.changeTabEvents();
                    });
                },1200);
                event.preventDefault();
            })
        }
    }

    dataTableApp.addItemsInPageObjListData('tabLevel',dataTableObj.tabLevel);
    dataTableApp.callDataTable(function(){
        openOrderPageObj.methods.setActiveOnTab();
        openOrderPageObj.events.changeTabEvents();
    });
});