function loadMasterWrapper(done){
    $.ajax({
        method : 'GET',
        url : iSearch_data.partialsPath+'/master.html',
        cache: false,
        success : function(data){
        var tmp = Handlebars.compile(data);
        Handlebars.registerPartial('masterWrapper', tmp);
        done(tmp);
        },
        fail : function(xhr) {
        console.log(xhr);
        }
    });
}
function loadSidebarWrapper(done){
    $.ajax({
        method : 'GET',
        url : iSearch_data.partialsPath+'/sidebar.html',
        cache: false,
        success : function(data){
        var tmp = Handlebars.compile(data);
        Handlebars.registerPartial('sidebarWrapper', tmp);
        done(tmp);
        },
        fail : function(xhr) {
        console.log(xhr);
        }
    });
}

function loadResultList(done){
    $.ajax({
        method : 'GET',
        url : iSearch_data.partialsPath+'/result-list.html',
        cache: false,
        success : function(data){
        var tmp = Handlebars.compile(data);
        Handlebars.registerPartial('listWrapper', tmp);
        done(tmp);
        },
        fail : function(xhr) {
        console.log(xhr);
        }
    });
}

Handlebars.registerHelper('getContent', function(id, obj){
    return obj[id].content[0];
});