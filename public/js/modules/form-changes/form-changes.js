$(document).ready(function(){

    var isFormChanged = false;

    //get original data
    var originalData = $("#my-form1").serialize();
    //console.log(originalData);

    $(window).on("beforeunload", function() { 
        console.log('user wants to close');
        isFormChanged = checkFormChanged();
        console.log(isFormChanged);
        if(isFormChanged)
        return confirm("Do you really want to close?"); 
    });

    function checkFormChanged(){
        var tempData = $("#my-form1").serialize();
        if(tempData != originalData) return true;
        return false;
    }
    //form submit event
    $('#my-form1').submit(function(){
        console.log('submit event');
        event.preventDefault();
    });
});