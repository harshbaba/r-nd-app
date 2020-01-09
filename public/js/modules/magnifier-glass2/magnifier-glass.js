$(document).ready(function(){
    $('#enable-magnifier').change(function(){
        if($(this).is(":checked")) {
            $('#exploded_svg_image svg').hide();
            $('#svg-img-src').show();
        }else{
            $('#svg-img-src').hide();
            $('#exploded_svg_image svg').show();
        }
    });

    $('img.light-zoom').lightzoom({
        zoomPower   : 2,    //Default
        glassSize   : 180,  //Default
    });

});

