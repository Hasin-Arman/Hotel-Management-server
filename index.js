const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.23pjc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookingsCollection = client.db("hotello").collection("bookings");
  const commentsCollection = client.db("hotello").collection("comments");
  const serviceCollection = client.db("hotello").collection("services");

  app.post('/addBooking', (req, res) => {
    bookingsCollection.insertOne(req.body)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/addComment', (req, res) => {
    commentsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.post('/addComment', (req, res) => {
    commentsCollection.insertOne(req.body)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/addService', (req, res) => {
    serviceCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      });
  })

  app.post('/addService', (req, res) => {
    serviceCollection.insertOne(req.body)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)