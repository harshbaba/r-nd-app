var express = require('express');
var api = express.Router();


var r_nd_d_Model            = require('../models/r_nd_d');
var globalHelper            = require('../utils/global_helper'); 


//cors request
api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//==========================R_ND_APP Routes Start==========================
api.get('/products',function(req, res){
    var completeData = JSON.parse(r_nd_d_Model.r_nd_d_data);
    var data = globalHelper.processedProducts(completeData.products, req.query);
    res.send(data);
});

api.get('/isearch',function(req, res){
    console.log(req.query.docType);
    var completeData = JSON.parse(r_nd_d_Model.r_nd_d_data);
    var data = globalHelper.processedProducts(completeData[req.query.docType], req.query);
    res.send(data);
});

module.exports = api;