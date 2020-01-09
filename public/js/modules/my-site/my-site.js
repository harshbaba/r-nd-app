$(document).ready(function(){
    $('.go-btn').click(function(){
        var siteUrl = $('input[name="site-url"]').val();
        if(siteUrl != ""){
            var html = createSiteHtml(siteUrl);
            $('.site-placeholder').html(html);
        }
    });

    function createSiteHtml(siteUrl){

        var html = "";
        html += '<iframe src="'+siteUrl+'">'+
                    '<p>Your browser does not support iframes.</p>'+
                '</iframe>';

        return html;
    }
});

