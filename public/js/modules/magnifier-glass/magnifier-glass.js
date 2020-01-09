function showSvgPopup(){
    $('.svg-popup-model').addClass('active');
}

function hideSvgPopup(){
    $('.svg-popup-model').removeClass('active');
}

$('.magnifier-open-popup').click(function(ev){
    showPageBg();
    showSvgPopup();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    ev.preventDefault();
});

$('.close-magnifier-popup').click(function(ev){
    hideSvgPopup();
    hidePageBg();
    ev.preventDefault();
  });

$('img.light-zoom').lightzoom({
    zoomPower   : 2,    //Default
    glassSize   : 180,  //Default
});