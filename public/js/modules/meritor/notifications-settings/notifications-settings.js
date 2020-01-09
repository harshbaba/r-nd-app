import { ENGINE_METHOD_STORE } from "constants";

$(document).ready(function(){
    $('.select-all-row .checkbox-ind > label').click(function(){
        var targetEl = $(this).parents('.order-2col').attr('data-checkbox');
        if($(this).prev('input').prop('checked')){
            handleCheckOrUncheck(targetEl, false);
        }
        else{
            handleCheckOrUncheck(targetEl, true);
        }
    });

    function handleCheckOrUncheck(targetEl, operation){
        $('.order-2col.'+targetEl).each(function(){
            if(!$(this).find('input[type="checkbox"]').prop('readonly')){
                $(this).find('input[type="checkbox"]').prop('checked', operation);
            }
        });
    }

    $('.checkbox-ind > label').click(function(){
        if($(this).prev('input[type="checkbox"]').prop('readonly')){
            alert('you cant change it');
            return false;
        }
    });
});
var logonPassword = "hello";
if(x > 4) {
    //Need to show popup here
    var html = '<div><p>Your user ID is assigned more than 50 ship to codes.  Alerts will be generated for all ship to codes assigned to your user ID.  This could result in significant volume of alert emails/texts.</p><button onclick="MyAccountDisplay.myFunction(form,'+logonPassword+','+logonPasswordVerify+')">Save</button>';
    
    $('.custom-model').html(html).addClass("active");
    $('.page-bg').addClass("active");
    
}


$('.close-success-popup').on('click', function(){
    $('.page-bg').removeClass("active");
});

