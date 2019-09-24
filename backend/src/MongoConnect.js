
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@clusterpunchi-sujlc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  if(err) throw err
  console.log("Connected to database")
  // Retrieve collection Users
  var users = client.db("PUNCHI").collection("Users");
  // Inserción de usuarios
  users.insertOne({"_id" : "123456789", "nombre" : "Arnau"}).then(() => console.log(users.findOne()));

  
});