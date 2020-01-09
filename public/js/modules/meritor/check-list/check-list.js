var checkListmethods, checkListhtml, checkListevents, checkListinit;
$(document).ready(function(){
    var checkCounter = 1;
    // var footerHtml ="<div class='page-bg'></div><div class='custom-model'></div>";
    // $('body').append(footerHtml);

    checkListevents = {
        "loadCheckListEvents": function(){
            $('.submit-checklist-btn').click(function(){
                
                $('.inline-error-box > p').html('');
                var shipToCodes="";
                $('.check-list input:checked').each(function(){
                    shipToCodes+=$(this).val()+",";
                });
                
                if(shipToCodes == ""){
                    $('.inline-error-box > p').html('*Please select atleast one code');
                    return false;
                }
                location.href=pageObj.invoiceOrderViewURL+"&shipToCode="+shipToCodes;
                console.log(shipToCodes);
            });
            
            $('.close-checklist-popup').click(function(){
                $('.custom-model').html('');
                $('.page-bg').removeClass('active');
                $('.custom-model').removeClass('active');
            });

            $('.check-list-ind input').click(function(){
                if ($(this).prop('checked')) {
                    if(checkCounter > 5){
                        $('.inline-error-box > p').html('*Maximum 5 codes you can select');
                        //alert('*Maximum 5 codes you can select');
                        return false;
                    }
                    $('.inline-error-box > p').html('');
                    checkCounter++;
                }
                else{
                    $('.inline-error-box > p').html('');
                    checkCounter--;
                }
            });
        }
    }

    checkListhtml ={
        "loadCheckListPopupHtml": function(){
            checkCounter = 1;
            loadCheckListPopup(function(template){
                var content = template(pageObj.listData);
                $('.custom-model').html(content);
                $('.page-bg').addClass('active');
                $('.custom-model').addClass('active');
                checkListevents.loadCheckListEvents();
            });
        }
    }

    checkListhtml.loadCheckListPopupHtml();

});
