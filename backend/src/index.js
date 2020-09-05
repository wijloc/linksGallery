const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
if (process.env.NODE_ENV = 'production'){
  app.use(express.static(path.join(__dirname, 'static')))
}

const MongoClient = require('mongodb').MongoClient;

app.get('/items', (req, res) => {
	console.log(process.env.LG_CONNECTION_STRING);
	MongoClient.connect(process.env.LG_CONNECTION_STRING, (err, client) => {
	  if (err) return console.log(err)
	  db = client.db('gallery')
	  db.collection(req.query.collection).find().toArray(function(err, results) {
		  if (err)
			  console.log(err);
		  res.send(results);		  
		  client.close();
	  })	  
	});
})

app.get('/add', (req, res) => {  
  var nextId;
  MongoClient.connect(process.env.LG_CONNECTION_STRING, (err, client) => {
	  if (err) return console.log(err)
	  db = client.db('gallery')
	    db.collection(req.query.collection).insertOne({        
        link: req.query.link,
        source: req.query.source
      });
      
      client.close();
      
      res.send('Inserido com sucesso!');
	  })	
})

app.listen(process.env.PORT || 8081)