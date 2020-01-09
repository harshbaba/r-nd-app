Handlebars.registerHelper('commentsCount', function(arr, options) {
    if(arr){
        return arr.length;
    }
    return 0;  
});