$(document).ready(function(){
    var events,host,components,services,iSearchObj;
    
    iSearchObj = {
        "pageSideBarConfig":{
            "all":{
                "isSideBar":false,
            },
            "osc_support_internal":{
                "isSideBar":true
            },
            "documentation":{
                "isSideBar":true
            },
            "dw":{
                "isSideBar":false
            },
            "etrack":{
                "isSideBar":false
            }
        },
        "documentConfig":{
            "documentType": "all",
            //"documentType": "osc_support_internal",
            //"documentType": "dw",
            //"documentType": "etrack"
        },
        "data":{}
    }

    host = {
        "init": function(){
            services.getData(function(response){
                console.log(response);
                iSearchObj.data = response;
                components.loadMasterComp();
            });
        }
    }

    components = {
        "loadMasterComp": function(){
            loadMasterWrapper(function(template){
                var content = template();
                $('#search-page-placeholder').html(content);
                components.loadSideBarComp();
                components.loadresultComp();
                events.loadMasterEvents();
          });
        },
        "loadSideBarComp": function(){
            loadSidebarWrapper(function(template){
                var currDocType = iSearchObj.documentConfig.documentType; 
                var sideBarData = {
                    "isSideBar": iSearchObj.pageSideBarConfig[currDocType].isSideBar,
                    "currentDocType": iSearchObj.documentConfig.documentType,
                    "facet_fields": iSearchObj.data.list.facet_counts.facet_fields
                }
                var content = template(sideBarData);
                $('#sideBarPlaceholder').html(content);
          });
        },
        "loadresultComp": function(){
            loadResultList(function(template){
                var resultListData = {
                    "list":iSearchObj.data.list,
                    "currentDocType": iSearchObj.documentConfig.documentType,
                }
                debugger;
                var content = template(resultListData);
                $('#resultListPlaceholder').html(content);
          });
        }
    }

    services = {
        "getData": function(done){
            $.ajax({
                type: "GET",
                url: iSearch_data.getDataUrl,
                data: {docType: iSearchObj.documentConfig.documentType},
                //cache: false,
                //dataType: "JSON",
                success: function(data) {
                    //hidePageLoader();
                    done(data);
                },
                error: function(jqXHR){
                    //hidePageLoader();
                }
            });
        }
    }

    events = {
        "loadMasterEvents": function(){
            $('#con_ResultsTabs > li > a').click(function(event){
                if(!$(this).hasClass('active')){
                    var thisSelector  =  $(this);
                    iSearchObj.documentConfig.documentType  = thisSelector.attr('data-documentType');
                    services.getData(function(response){
                        iSearchObj.data = response;
                        $('#con_ResultsTabs > li > a').removeClass('active');
                        console.log( thisSelector.attr('data-documentType'));
                        debugger;
                        thisSelector.addClass('active');
                        components.loadSideBarComp();
                        components.loadresultComp();
                    });
                }
                event.preventdefault;
            });
        }
    }

    host.init();
    
});