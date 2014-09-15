var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var ipaddress = process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;


var server = new Server(ipaddress, port, {auto_reconnect: true});
db = new Db('productdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'productdb' database");
        db.collection('products', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving product: ' + id);
    db.collection('products', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findByCategory = function(req, res) {
    var category = req.params.category;
    console.log('Retrieving products for category: ' + category);
    db.collection('products', function(err, collection) {
        collection.find({'category': category}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByAnyCategory = function(req, res) {
    var categories = req.params.category.split(',');
    db.collection('products', function(err, collection) {
        collection.find({'category': { '$in' : categories } }).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByAllTags = function(req, res) {
    var tags = req.params.tags.split(',');
    db.collection('products', function(err, collection) {
        collection.find({'tags' : { '$all' : tags }}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByAnyTag = function(req, res) {
    var tags = req.params.tags.split(',');
    db.collection('products', function(err, collection) {
        collection.find({'tags' : { '$in' : tags }}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('products', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addProduct = function(req, res) {
    var product = req.body;
    console.log('Adding product: ' + JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.insert(product, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateProduct = function(req, res) {
    var id = req.params.id;
    var product = req.body;
    console.log('Updating product: ' + id);
    console.log(JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, product, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating product: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(product);
            }
        });
    });
}

exports.deleteProduct = function(req, res) {
    var id = req.params.id;
    console.log('Deleting product: ' + id);
    db.collection('products', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var products = [
        {
            "name" : "Indian Necklace",
            "price" : "10.50",
            "category" : "Necklace",
            "tags" : [ "green", "gold"],
    	    "description" : "This is a Necklace" ,
            "imagePath" : "Necklace",
            "imageCount" : "2"
        },
        {
            "name" : "Indian Clips",
            "price" : "10.50",
            "category" : "Clip",
            "tags" : [ "green", "blue"],
            "description" : "This is a Clip",
            "imagePath" : "Clip",
            "imageCount" : "2" 
        },
        {
            "name" : "Indian Bracelet",
            "price" : "10.50",
            "category" : "Bracelet",
            "tags" : [ "green", "red"],
            "description" : "This is a Bracelet",
            "imagePath" : "Bracelet",
            "imageCount" : "3" 
        },
        {
            "name" : "Indian Anklet",
            "price" : "10.50",
            "category" : "Anklet",
            "tags" : [ "green", "pink"],
            "description" : "This is a Anklet" ,
            "imagePath" : "Anklet",
            "imageCount" : "3"
        }
    ];

    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {});
    });

};
