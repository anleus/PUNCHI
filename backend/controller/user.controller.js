const User = require('../models/users');

const userFunctions = {};

userFunctions.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.json(users);
};

userFunctions.getUserById = async (req, res, next) => {
    const user = await User.findById(req.body.id);
    res.json(user);
};

userFunctions.getUserByUsername = async (req, res, next) => {
    var params = req.body.username;
    const user = await User.find({username: req.params.username}, function (err, docs) {
        if (err)    console.error(err);
        if (docs)   console.log(docs);
    });
    res.json(user);
};

userFunctions.addUser = async (req,res,next) => {
    console.log("printgreq.value");
    console.log(req.body);
    const user = new User({
        /*nombre: req.params.nombre,
        apellidos: req.params.apellido,
        fechaNacimiento: req.params.date,
        email: req.params.email,
        localidad: req.params.localidad,
        provincia: req.params.provincia,
        domicilio: req.params.domicilio,
        telefono: req.params.telefono,
        gestor: req.params.gestor,
        admin: req.params.admin,
        nuss: req.params.nuss,
        deleted: false,
        username: req.params.username,
        password: req.params.password,
        becario: req.params.becario*/
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        localidad: req.body.localidad,
        provincia: req.body.provincia,
        domicilio: req.body.domicilio,
        telefono: parseInt(req.body.telefono,10),
        gestor: false,
        admin: false,
        nuss: parseInt(req.body.telefono,10),
        deleted: false,
        username: req.body.username,
        password: req.body.password,
        becario: false
    })
    user.save()
        .then(() => res.json({status: 'User saved'}))
        .catch((err) => {
            res.status(400);
            console.error(err);
        }

        );
};

userFunctions.updateUser = (req, res, next) => {
    const user = new User({
        nombre: req.params.nombre,
        apellidos: req.params.apellido,
        fechaNacimiento: req.params.date,
        email: req.params.email,
        localidad: req.params.localidad,
        provincia: req.params.provincia,
        domicilio: req.params.domicilio,
        telefono: req.params.telefono,
        gestor: req.params.gestor,
        admin: req.params.admin,
        nuss: req.params.nuss,
        deleted: false,
        username: req.params.username,
        password: req.params.password,
        becario: req.params.becario
    })
    User.findByIdAndUpdate(req.params.id,{$set: user}, {new: true})
        .then(() => {
            res.status(200); 
            res.send("User updated")})
        .catch((err) => {
            res.status(400);
            res.send("Bad request");});
};


userFunctions.deleteUser = async (req, res, next) => {
    await User.findByIdAndRemove(req.params.id)
    .then(() => {
        res.status(200);
        res.json({status: 'User deleted'})})
    .catch(() => {
        res.status(500);
        res.send("Request cannot be fullfilled")});
};

module.exports = userFunctions;