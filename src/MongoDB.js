/**
 * MONGODB connection
 *  User: admin, pass: admin
 */
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@clusterpunchi-sujlc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    // perform actions on the collection object
    if(err)
        console.log(err);
    else
        console.log('Connected!');
});
