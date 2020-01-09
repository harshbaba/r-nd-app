let global_helper = {};


global_helper.processedProducts = function(data, query){
    let searchBy = query.searchBy;

    let finalData = {
        "navigation":[],
        "list":[]
    };
    if(searchBy){
        var condition = global_helper.createCondition(query);

        for(let i = 0; i< data.length; i++){
            if(eval(condition)){
                finalData.list.push(data[i]);
            }
        }
        finalData = global_helper.filterAttr(searchBy,finalData,query);
    }else{
        finalData.list = data;
    }
    
    return finalData;
}

global_helper.getAttributes = function(prodAttr, data, query){
    var rootObj = {
        "attributeName":prodAttr,
        "attributes": [],
        "attributesCopy":[]
    }

    //console.log(data);
    for(var i = 0; i< data.length; i++){
        if(!rootObj.attributesCopy.includes(data[i][prodAttr])){
            var attributeObj = {
                "attrName": data[i][prodAttr],
                "isActive": global_helper.isAttributeActive(prodAttr,query,data[i][prodAttr])
            }
            rootObj.attributes.push(attributeObj);
            rootObj.attributesCopy.push(data[i][prodAttr]);
        }
    }
    return rootObj;
}

global_helper.isAttributeActive = function(prodAttr,query,attrValue){
    if(query[prodAttr]){
        var attrArray = query[prodAttr].split(',');
        if(attrArray.includes(attrValue)) return true;
    }
    return false;
}

global_helper.filterAttr = function(searchBy, finalData,query){

    switch (searchBy) {
        case "mobile":
            finalData.navigation.push(global_helper.getAttributes('brand',finalData.list,query));
            finalData.navigation.push(global_helper.getAttributes('display',finalData.list,query));
            break;
        case "tv":
            finalData.navigation.push(global_helper.getAttributes('brand',finalData.list,query));
            finalData.navigation.push(global_helper.getAttributes('type',finalData.list,query));
            break;
        case "ac":
            finalData.navigation.push(global_helper.getAttributes('brand',finalData.list,query));
            finalData.navigation.push(global_helper.getAttributes('type',finalData.list,query));
            break;
    }

    return finalData;
}



global_helper.createCondition = function(queryData){
    let query = ""; let first = true;
    for(attr in queryData){
        if(!first){
            query += " && ";
        } 
        first = false;
        query += global_helper.createAttrCond(queryData[attr],attr);
    }
    console.log(query);
    return query;
}

global_helper.createAttrCond = function createAttrCond(attrValue,attrKey){
	if (attrValue.indexOf(',') > -1){
		var attrValueArr = attrValue.split(',');
		var conditionStr = "";
		for(var i = 0; i< attrValueArr.length; i++){
			if(i == 0){
				conditionStr +="(";
			}
			else{
				conditionStr +=" || ";
			}
			//conditionStr += attrKey+" == "+attrValueArr[i];
			conditionStr += "data[i]['"+attrKey+"'] == '"+attrValueArr[i]+"'";
		}
		conditionStr += ")";
		return conditionStr;
	}else{
		//return attrKey+" == "+attrValue;
		return "data[i]['"+attrKey+"'] == '"+attrValue+"'";
	}
}

module.exports = global_helper;