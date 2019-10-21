const User = require("../models/users");

const userFunctions = {};

userFunctions.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};

userFunctions.getUserById = async (req, res, next) => {
  const user = await User.findById(req.body.id);
  res.json(user);
};

userFunctions.authentication = async (req, res, next) => {
  console.log(req);
  var usernamefromreq = req.body.username;
  var passfromreq     = req.body.password;
  console.log('Username from req: ' + usernamefromreq);
  console.log('Pass from req: ' + passfromreq);
  const user = await User.findOne({ username: usernamefromreq }, function (err, docs) {
    if (err) {
      console.error(err)
      console.log('Ha habido algun error');
    }
  });

  if (user == null) {
    console.log('No se ha encontrado ningún usuario');
    res.json(null);
    return;
  }

    console.log('Usuario encontrado - Continuando con la función...')
    const userJ =  JSON.parse(JSON.stringify(user));

    if (userJ.password != passfromreq) {
      console.log('Contraseña incorrecta');
      res.json(null);
      return;
    }
    
    res.json(user);
};

userFunctions.getUserByUsername = async (req, res, next) => {
  var usernamefromreq = req.params.username;
  console.log('Username from req: ' + usernamefromreq);
  const user = await User.findOne({ username: usernamefromreq }, function (err, docs) {
    if (err) {
      console.error(err)
      console.log('Ha habido algun error');
    }
  });

  if (user == null) {
    console.log('user.controller.js - No se ha encontrado ningún usuario');
    res.json(null);
    return;
  }
    console.log('Usuario encontrado')    
    res.json(user);
};

userFunctions.addUser = async (req, res, next) => {
  //console.log(req.body);
  const user = new User({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    fechaNacimiento: req.body.fechaNacimiento,
    email: req.body.email,
    localidad: req.body.localidad,
    provincia: req.body.provincia,
    domicilio: req.body.domicilio,
    telefono: req.body.telefono,
    gestor: req.body.gestor,
    admin: req.body.admin,
    nuss: req.body.nuss,
    deleted: false,
    username: req.body.username,
    password: req.body.password,
    becario: req.body.becario
  })
  console.log(user);
  user.save()
    .then(() => res.json({ status: 'User saved' }))
    .catch((err) => {
      res.status(400);
      console.error(err);
    });
};

userFunctions.updateUser = (req, res, next) => {
  const user = new User({
    _id: req.body._id,
    nombre: req.body.nombre,
    apellidos: req.body.apellido,
    fechaNacimiento: req.body.date,
    email: req.body.email,
    localidad: req.body.localidad,
    provincia: req.body.provincia,
    domicilio: req.body.domicilio,
    telefono: req.body.telefono,
    gestor: req.body.gestor,
    admin: req.body.admin,
    nuss: req.body.nuss,
    deleted: false,
    username: req.body.username,
    password: req.body.password,
    becario: req.body.becario
  });

  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })
    .then(() => {
      //res.status(200);
      res.send("User updated");
    })
    .catch(err => {
      res.status(400);
      res.send("Bad request");
      console.log(err);
    });
};

userFunctions.deleteUser = async (req, res, next) => {
  console.log(req)
  await User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200);
      res.json({ status: "User deleted" });

    })
    .catch(() => {
      res.status(500);
      res.send("Request cannot be fullfilled");
    });
};

userFunctions.getUsersNonDeleted = async (req, res, next) => {
  const users = await User.find({deleted: false});
  res.json(users);
};

module.exports = userFunctions;
