// eslint-disable-next-line prefer-destructuring
const MongoClient = require('mongodb').MongoClient;

// BD connection
const uri = 'mongodb+srv://admin:admin@clusterpunchi-sujlc.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function createIndexing(collectionName, indexs, db) {
  const collect = db.collection(collectionName).catch(() => {});
  for (let i = 0; i < indexs.length; i += 1) {
    collect.createIndex(indexs[i]).catch(() => {});
  }
}

function insertUsers(db) {
  const users = db.collection('Users');
  users.insertOne({
    nombre: 'Paco',
    apellidos: 'PB',
    fechaNacimiento: '25/06/1998',
    email: 'asdfadf@gmail.com',
    localidad: 'valencia',
    provincia: 'Valencia',
    domicilio: 'Calle A 54',
    telefono: '11111111',
    gestor: true,
    admin: true,
    nuss: 0,
    deleted: false,
  }).catch(() => { });
  users.insertOne({
    nombre: 'Stella',
    apellidos: 'Lepicalapucha',
    fechaNacimiento: '12/04/1232',
    email: 'asdfadf@gmail.com',
    localidad: 'ontinyent',
    provincia: 'Valencia',
    domicilio: 'Carrer B5asdfa4',
    telefono: '4444444444',
    gestor: true,
    admin: true,
    nuss: 1,
    deleted: false,
  }).catch(() => { });
}

function insertDepartament(db) {
  const departamento = db.collection('Departamento');
  departamento.insertOne({
    nombreDepartamento: 'RRHH',
    responsable: 'admin',
    usuarios: [],
  });
}

async function getCollections(db) {
  const collections = await db.listCollections().catch(() => {});
  return collections.toArray();
}

async function restoreDatabase() {
  const db = client.db('PUNCHI').catch(() => {});
  const collections = await getCollections(db);
  db.createCollection('empty').catch(() => {});

  // REMOVE EXISTING DATA
  await collections.forEach((collection) => {
    db.dropCollection(collection.name, () => {});
  });

  // CREATE NEW COLLECTIONS
  const database = {};
  database.Users = ['nombre', 'apellidos', 'fechaNacimiento', 'email', 'localidad', 'provincia', 'domicilio', 'telefono', 'gestor', 'admin', 'nuss', 'deleted'];
  database.Departamento = ['nombreDepartamento', 'responsable', 'usuarios'];
  database.JornadaLaboral = ['usuario', 'entrada', 'salida'];
  Object.keys(database).forEach((collection) => {
    db.createCollection(collection).then(() => {
      createIndexing(collection, database[collection], db);
    }).catch(() => {});
  });
  db.dropCollection('empty');

  // POBLATE COLLECTIONS
  insertUsers(db);
  insertDepartament(db);
}

// eslint-disable-next-line no-console
client.connect().then(() => restoreDatabase()).catch((err) => { console.log(err); });
