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

userFunctions.login = async (req, res, next) => {
  var usernamefromreq = req.params.username;
  var passfromreq     = req.params.password;
  const user = await User.findOne({ username: usernamefromreq }, function(err, docs) {
    if (err) console.error(err);
  });
  const userJ =  JSON.parse(JSON.stringify(user));
  
  res.json(user);
};

userFunctions.addUser = async (req, res, next) => {
  const user = new User({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    fechaNacimiento: req.body.fechaNacimiento,
    email: req.body.email,
    localidad: req.body.localidad,
    provincia: req.body.provincia,
    domicilio: req.body.domicilio,
    telefono: parseInt(req.body.telefono, 10),
    gestor: false,
    admin: false,
    nuss: parseInt(req.body.telefono, 10),
    deleted: false,
    username: req.body.username,
    password: req.body.password,
    becario: false
  });
  user
    .save()
    .then(() => res.json({ status: "User saved" }))
    .catch(err => {
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
  await User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200);
      res.json({ status: "User deleted" });
    })
    .catch(() => {
      res.status(500);
      res.send("Request cannot be fullfilled");
    });
};

module.exports = userFunctions;
