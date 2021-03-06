require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var  userRoute = require('./routes/user.route');
var  authRoute = require('./routes/auth.route');
var  productRoute = require('./routes/product.route');
var  cartRoute = require('./routes/cart.route');

var authMiddeware = require('./middlewares/auth.middleware');
var sessionMiddeware = require('./middlewares/session.middleware');
var port = 3000

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddeware);

app.use(express.static('public'))

app.get('/',function(req,res){
    res.render('index');
});
app.use('/users', authMiddeware.requireAuth, userRoute);
app.use('/auth',authRoute);
app.use('/products',authMiddeware.requireAuth, productRoute);
app.use('/cart', cartRoute);

app.listen(port,function(){
    console.log('Server listening on port '+port );
});
