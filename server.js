var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var express = require('express')
var product = require('./routes/products');
 
var app = express();

app.use(express.compress());
app.use(express.static(__dirname + '/public'), {maxAge: 20});
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser());
 
app.get('/products', product.findAll);
app.get('/products/:id', product.findById);
app.get('/products/c/:category', product.findByCategory);
app.get('/products/c/any/:category', product.findByAnyCategory);
app.get('/products/t/all/:tags', product.findByAllTags);
app.get('/products/t/any/:tags', product.findByAnyTag);
app.post('/products', product.addProduct);
app.put('/products/:id', product.updateProduct);
app.delete('/products/:id', product.deleteProduct);
 
app.listen(port, ipaddress);
console.log('Listening on port 3000...');
