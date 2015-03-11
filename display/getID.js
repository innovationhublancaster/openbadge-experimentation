var express = require('express');
var app = express();

var express = require("express");
var logfmt = require("logfmt");
var app = express();
var http = require("http");
var bodyParser = require('body-parser');

app.use(logfmt.requestLogger());
app.use(bodyParser.json());

app.get('/', function(req, res) {
    var earnerData = JSON.stringify({
        email: 'stennett10@gmail.com'
    });

    var requestOptions = {
        host : 'backpack.openbadges.org', 
        path : '/displayer/convert/email', 
        method : 'POST', 
        headers: {'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(earnerData)
        }
    };

    var convertRequest = http.request(requestOptions, function(reqResponse) {
        var response = [];
        reqResponse.setEncoding('utf8');

        //store data
        reqResponse.on('data', function (responseData) {                    
            response.push(responseData);
        });

        reqResponse.on('end', function(){
            var recData=JSON.parse(response.join('')); 
            console.log('response: ' + recData);
            res.send(recData);
        });
    });

    convertRequest.on('error', function(e) {
        console.error(e);
    });
    // post the data
    convertRequest.write(earnerData);
    convertRequest.end();
});

app.listen(3000);