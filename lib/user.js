require('./vars');
require('../model/user');

var exports = module.exports = {};

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const MongoObjectId = Mongo.ObjectID;

let collectionName = 'users';

const urlDatabase = dev ? databaseInfo.url.dev : databaseInfo.url.prod;

//** USER **//

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
        const query = { _id : new MongoObjectId(req.params.id) };

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
        let query =  req.body;
        profilRoot = query;

        //ENGAGEMENT
        if(profilRoot.isEngaged) {
            let nbEngagementMonth = 0;
            switch(profilRoot.subscription) {
                case "simple": nbEngagementMonth = 12; break;
                case "resident": nbEngagementMonth = 8; break;
            }
            let nowDate = new Date();
            let day = nowDate.getDate();
            let newDate = new Date(nowDate.setMonth(nowDate.getMonth() + nbEngagementMonth));
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();

            profilRoot.engagementDate = day + "/" + month + "/" + year;
            query = profilRoot;
        }

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
        const query = { _id : new MongoObjectId(req.params.id) };
        const newValues = { $set: Object.freeze(req.body)};

        collection.updateOne(query, newValues).then((result) => {
            console.log(result);
            res.end("User updated!");
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
        const query = { _id : new MongoObjectId(req.params.id) };

        collection.deleteOne(query).then((result) => {
            console.log(result);
            res.end("User deleted!");
            client.close();
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
};

exports.login = (req, res) => {
    MongoClient.connect(urlDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(databaseInfo.name);
        const collection = dbo.collection(collectionName);
        let query = req.body;
        query = JSON.parse('{"connectDetail":' + JSON.stringify(query) + '}');
        collection.find(query).toArray((err, result) => {
            console.log(result);
            if (result.length <= 0)
                res.end(null);
            else
                res.end(JSON.stringify(result));
            client.close();
        })
    }).catch((err) => {
        console.error(err)
    })
};