
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin@clusterpunchi-sujlc.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  if (err) { console.log(err); } else { console.log('Connected to database'); }
});
