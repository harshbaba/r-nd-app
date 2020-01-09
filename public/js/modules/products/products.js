$(document).ready(function(){
    var components,services,host,events;
    var data = {
        "twoColumn": false,
        "products":[]
    }

    components = {
        "loadWrapper": function(products){
            loadProductsWrapper(function(template){
                var content = template(products);
                $('.search-result-wrapper').html(content);
                components.loadProducts(products.products);
                events.loadSideBarEvent();
            });
        },

        "loadProducts": function(products){
            loadProductList(function(template){
                var content = template(products);
                $('.products-search-list').html(content);
            })
        }


    };
     
    services = {
        "getProducts":function(done){
            showPageLoader();
            $.ajax({
                type: "GET",
                url: products_data.searchProductsUrl,
                //data: {locationData: reqData},
                //cache: false,
                //dataType: "JSON",
                success: function(data) {
                    hidePageLoader();
                    done(data);
                },
                error: function(jqXHR){
                    hidePageLoader();
                }
            });
        }
    };

    host = {
        "updateUrlParameter": function(uri, key, value){
            //first we will check is attribute exist already in url, in case we will append value with comma inside that attribute

            // remove the hash part before operating on the uri
            var i = uri.indexOf('#');
            var hash = i === -1 ? ''  : uri.substr(i);
                uri = i === -1 ? uri : uri.substr(0, i);

            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                uri = uri.replace(re, '$1' + key + "=" + value + '$2');
            } else {
                uri = uri + separator + key + "=" + value;
            }
            return uri + hash;  // finally append the hash as well
        },
        "getUrlVars": function(sourceUrl){
            var vars = [], hash, url;
            url = window.location.href;
            if(sourceUrl) url = sourceUrl;
            var hashes = url.slice(url.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        "wrapperInit":function(){
            var searchBy = host.getUrlVars()["searchBy"];
            if(searchBy) {
                products_data.searchProductsUrl = host.setSearchProductApiUrlOnInit();
                data.twoColumn = true
            }
            services.getProducts(function(response){
                data.products = response;
                components.loadWrapper(data);
            })
        },
        "popState": function(){
            var searchBy = host.getUrlVars()["searchBy"];
            products_data.searchProductsUrl = host.setSearchProductApiUrlOnBackButton();
            
            services.getProducts(function(response){
                data.products = response;
                if(!searchBy) {
                    data.twoColumn = false;
                }
                components.loadWrapper(data);
            });
            
        },
        "setSearchProductApiUrlOnInit": function(){
            var urlVars = host.getUrlVars();
            for(var i = 0; i< urlVars.length; i++){
                products_data.searchProductsUrl = host.updateUrlParameter(products_data.searchProductsUrl, urlVars[i], urlVars[urlVars[i]]);
            }
            return products_data.searchProductsUrl;
        },
        "setSearchProductApiUrlOnBackButton": function(){
            var apiUrlVars = host.getUrlVars(products_data.searchProductsUrl);
            var urlVars = host.getUrlVars();

            for(var i = 0; i< apiUrlVars.length; i++){
                if(!urlVars[apiUrlVars[i]]){
                    products_data.searchProductsUrl = host.removeParam(apiUrlVars[i], products_data.searchProductsUrl);
                }else{
                    products_data.searchProductsUrl = host.updateUrlParameter(products_data.searchProductsUrl,urlVars[i],urlVars[urlVars[i]]);
                }
            }
            console.log('backbutton   '+ products_data.searchProductsUrl);
            return products_data.searchProductsUrl;
        },
        "removeParam": function(key, sourceURL){
            var rtn = sourceURL.split("?")[0],
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                rtn = rtn + "?" + params_arr.join("&");
            }
            return rtn;
        },
        "isAttributeExistInUrl": function(url,attributeKey){
            var isAttribute = host.getUrlVars(url)[attributeKey];
            if(isAttribute){
                return true;
            }
            return false;
        },
        "updateExistedAttributeWithUrl" : function(url,attributeKey,attributeValue,remove){
            var oldAttributeValue = host.getUrlVars(url)[attributeKey];
            if(remove){
               return host.processedAttributeValue(url,oldAttributeValue,attributeValue,attributeKey);
            }
            var newAttributeValue = oldAttributeValue+','+attributeValue;
            return host.updateUrlParameter(url, attributeKey, newAttributeValue);
        },
        "processedLayeredNav": function(attributeValue,attributeKey,isAttributeActive){
            var updatedCurrentUrl = "";
            var currentUrl = window.location.href;
            if(isAttributeActive){
                updatedCurrentUrl = host.updateExistedAttributeWithUrl(currentUrl,attributeKey,attributeValue,true);
                products_data.searchProductsUrl = host.updateExistedAttributeWithUrl(products_data.searchProductsUrl,attributeKey,attributeValue,true);
            }
            else{
                var isAttributeExist = host.isAttributeExistInUrl(currentUrl,attributeKey);
                if(isAttributeExist){
                    products_data.searchProductsUrl =  host.updateExistedAttributeWithUrl(products_data.searchProductsUrl,attributeKey,attributeValue);
                    updatedCurrentUrl = host.updateExistedAttributeWithUrl(currentUrl, attributeKey, attributeValue);
                
                }else{
                    products_data.searchProductsUrl = host.updateUrlParameter(products_data.searchProductsUrl, attributeKey, attributeValue);
                    updatedCurrentUrl = host.updateUrlParameter(currentUrl, attributeKey, attributeValue);
                }
            }

            services.getProducts(function(response){
                components.loadProducts(response);
                window.history.pushState({path:updatedCurrentUrl},'',updatedCurrentUrl);
            });
        },
        "processedAttributeValue":function(url,oldAttributeValue,attributeValue,attributeKey){
            var oldAttributeValue = oldAttributeValue;
            var attributeValueArray = oldAttributeValue.split(',');
            attributeValueArray.splice(attributeValueArray.indexOf(attributeValue),1);


            if(attributeValueArray.length > 0){
                var attributValueStr = attributeValueArray[0];
                for(var i = 1; i< attributeValueArray.length; i++){
                    attributValueStr+= ','+attributeValueArray[i];
                }

                return host.updateUrlParameter(url, attributeKey, attributValueStr);
            }else{
                return host.removeParam(attributeKey, url);
            }
        }
    };

    var events = {
        "loadMasterEvent":function(){
            $('#search-products').click(function(){
                var searchBy = $('#searchBy').val();
                if(!searchBy){
                    alert("Please enter product category/name"); 
                    return false;
                } 
                products_data.searchProductsUrl = host.updateUrlParameter(products_data.searchProductsUrl, 'searchBy', searchBy);
                
                services.getProducts(function(response){
                    if(data.twoColumn){
                        components.loadProducts(response);
                    }else{
                        data.twoColumn = true;
                        data.products = response;
                        components.loadWrapper(data);
                    }
                    
                    var currentUrl = window.location.href;
                    var updatedCurrentUrl = host.updateUrlParameter(currentUrl, 'searchBy', searchBy);
                    window.history.pushState({path:updatedCurrentUrl},'',updatedCurrentUrl);
                });
            });

            jQuery(window).on('popstate', function(event) {
                host.popState();
            });
        },

        "loadSideBarEvent": function(){
            $('.attribute-list > li').click(function(){
                var attributeValue = $(this).attr('attributeValue');
                var attributeKey = $(this).parent('ul').attr('attributeKey');
                if($(this).hasClass('active')){
                    host.processedLayeredNav(attributeValue,attributeKey,true);
                    $(this).removeClass('active');
                }else{
                    host.processedLayeredNav(attributeValue,attributeKey);
                    $(this).addClass('active');
                }

                console.log(products_data.searchProductsUrl);
            })
        }
    };

    host.wrapperInit();
    events.loadMasterEvent();
}); 