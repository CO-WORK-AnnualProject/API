const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const MongoObjectId = Mongo.ObjectID;
const databaseInfo = Object.freeze({"url":"mongodb://localhost:27017/", "name":"co-work"});
const serverInfo = Object.freeze({"host":"localhost", "port":8081});
const collectionName = "users";

const Express = require('express');
const app = Express();

const BodyParser = require('body-parser');

const fs = require("fs");

app.use(BodyParser.json()); // support json encoded bodies
app.use(BodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
   res.send('Server is open!')
});

app.get('/listUsers', (req, res) => {
   MongoClient.connect(databaseInfo.url, {
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
});

app.get('/listUsers/:id', (req, res) => {
   MongoClient.connect(databaseInfo.url, {
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
});

app.post('/addUser', (req, res) => {
   MongoClient.connect(databaseInfo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   }).then((client) => {
      const dbo = client.db(databaseInfo.name);
      const collection = dbo.collection(collectionName);
      const query =  req.body;

      collection.insertOne(query).then((result) => {
         console.log(result);
         res.end("User added!");
         client.close();
      }).catch((err) => {
         console.error(err)
      })
   }).catch((err) => {
      console.error(err)
   })
});

app.post('/updateUser/:id', (req, res) => {
   MongoClient.connect(databaseInfo.url, {
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
});

app.delete('/deleteUser/:id', (req, res) => {
   MongoClient.connect(databaseInfo.url, {
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
});

const server = app.listen(serverInfo.port, serverInfo.host, () => {
   const host = server.address().address;
   const port = server.address().port;
   console.log("Server started! At http://%s:%s", host, port)
});