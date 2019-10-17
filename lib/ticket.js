require('./vars');

var exports = module.exports = {};

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const MongoObjectId = Mongo.ObjectID;

let collectionName = 'tickets';

const urlDatabase = dev ? databaseInfo.url.dev : databaseInfo.url.prod;

//** TICKET **//

exports.getAll = (req, res) => {
    MongoClient.connect(urlDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(databaseInfo.name);
        const collection = dbo.collection(collectionName);
        const query = {};

        collection.find(query).toArray((err, result) => {
            if (err || result.length <= 0) res.end(null);
            console.log(result);
            res.end(JSON.stringify(result));
            client.close();
        });
    }).catch((err) => {
        console.error(err)
    })
};

exports.getOne = (req, res) => {
    MongoClient.connect(urlDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(databaseInfo.name);
        const collection = dbo.collection(collectionName);
        const query = {_id: new MongoObjectId(req.params.id)};

        collection.find(query).toArray((err, result) => {
            if (err || result.length <= 0) res.end(null);
            console.log(result);
            res.end(JSON.stringify(result));
            client.close();
        });
    }).catch((err) => {
        console.error(err)
    })
};

exports.addOne = (req, res) => {
    MongoClient.connect(urlDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(databaseInfo.name);
        const collection = dbo.collection(collectionName);
        const query = req.body;

        collection.insertOne(query).then((result) => {
            console.log(result);
            res.end(JSON.stringify(result));
            client.close();
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
};

exports.updateOne = (req, res) => {
    MongoClient.connect(urlDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(databaseInfo.name);
        const collection = dbo.collection(collectionName);
        const query = {_id: new MongoObjectId(req.params.id)};
        const newValues = {$set: Object.freeze(req.body)};

        collection.updateOne(query, newValues).then((result) => {
            console.log(result);
            res.end("Ticket updated!");
            client.close();
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
};

exports.deleteOne = (req, res) => {
    MongoClient.connect(urlDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(databaseInfo.name);
        const collection = dbo.collection(collectionName);
        const query = {_id: new MongoObjectId(req.params.id)};

        collection.deleteOne(query).then((result) => {
            console.log(result);
            res.end("Ticket deleted!");
            client.close();
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
};