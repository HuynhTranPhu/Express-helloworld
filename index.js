var express = require('express');
var app = express();
var port = 3000
app.get('/',function(request,response){
    response.send('Hello world');
});
app.get('/phu',function(request,response){
    response.send('Hello phu');
});
app.listen(port,function(){
    console.log('Server listening on port '+port );
});
