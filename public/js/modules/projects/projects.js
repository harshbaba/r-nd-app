jQuery(document).ready(function(){
    
    jQuery('.tab-list > li > a').click(function(event){
        if(!$(this).hasClass('active')){
            var tabLink = jQuery(this).attr('data-tablink');
            tabAction(tabLink);
        }
        event.preventDefault();
    });

    jQuery(window).on('popstate', function(event) {
        popStateHash();
    });

    function tabAction(tabLink){
        
        jQuery('.tab-list > li').find('a.active').removeClass('active');
        jQuery('.tab-box-outer').find('.tab-ind.active').removeClass('active');

        jQuery('.tab-list > li').find('a[data-tablink="'+tabLink+'"]').addClass('active');
        jQuery('.tab-box-outer').find('.tab-ind[data-tabbox="'+tabLink+'"]').addClass('active');
        location.hash = "tab_"+tabLink;
        return true;
    }

    function initializedTab(){
        location.hash = "tab_"+jQuery('.tab-list > li:first > a').attr('data-tablink');
    }

    function popStateHash(){
        var hashLocation = location.hash;
        if(hashLocation){
            var hashArr = hashLocation.split('_');
            if(hashArr[0] =="#tab"){
                tabAction(hashArr[1]);
            }
        }
    }

    popStateHash();
    //initializedTab();
});