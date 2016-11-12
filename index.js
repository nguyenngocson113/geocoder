var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var app = express();
app.set('view engine','ejs');
app.set('views','./views')
app.listen(3000);
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpApdapter:'https',
  apiKey: 'AIzaSyBL18dXATiadpnNsfIFpiXF4sKtzS_HXcU',
  formatter: null
}

app.get('/',function(req,res){
  res.render('form')
})
app.post('/address',urlencodedParser,function(req,res){
  var address = [];
  var diachi = req.body.address;
  var ten = req.body.ten;
  var geocoder = NodeGeocoder(options);
  geocoder.geocode(diachi,function(err,result){
    console.log(result);
    result.forEach(function(dc){
      address.push(dc);

    })
    res.render('map',{address,t:ten})
    console.log(address[0].latitude);
  })
})
