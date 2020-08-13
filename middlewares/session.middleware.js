var db = require('../db');
var shortid = require('shortid')

module.exports = function(req, res, next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId',sessionId,{
            signed: true
        });
        db.get('sessions').push({
            id: sessionId
        }).write();
    }
  
    var session= db.get('sessions[0].cart')
    .value();
    if(session){
        const values = Object.values(session);
        var total = 0;
        for(var i=0; i<values.length;i++)
        {
            total= total + values[i];
        }
        res.locals.total = total
    }
    
    next();
}