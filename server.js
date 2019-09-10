const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const MongoObjectId = Mongo.ObjectID;

const express = require('express');
const app = express();
const fs = require("fs");
const user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
};

var url = "mongodb://localhost:27017/myDB";

app.get('/listUsers', function (req, res) {
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("co-work");
      var query = {};
      dbo.collection("users").find(query).toArray(function(err, result) {
         if (err) throw err;
         console.log(result);
         res.end( JSON.stringify(result));
         db.close();
      });
   });
});

// app.get('/listUsers', function (req, res) {
//    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
//       console.log(data);
//       res.end(data);
//    });
// });

app.get('/listUsers/:id', function (req, res) {
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("co-work");
      var query = { _id : new MongoObjectId(req.params.id) };
      console.log(query);
      dbo.collection("users").find(query).toArray(function(err, result) {
         if (err) throw err;
         console.log(result);
         res.end( JSON.stringify(result));
         db.close();
      });
   });
});

// app.get('/listUsers/:id', function (req, res) {
//    // First read existing users.
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       const users = JSON.parse( data );
//       const user = users["user" + req.params.id];
//       console.log(user);
//       res.end( JSON.stringify(user));
//    });
// });

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      data["user4"] = user["user4"];
      console.log(data);
      res.end(JSON.stringify(data));
   });
});

app.delete('/deleteUser/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      const users = JSON.parse(data);
      delete users["user" + req.params.id];
      console.log(users["user" + req.params.id]);
      res.end(JSON.stringify(data));
   });
});

const server = app.listen(8081, '127.0.0.1', function () {
   const host = server.address().address;
   const port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port)
});