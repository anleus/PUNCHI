const User = require('../models/users');

const userFunctions = {};

userFunctions.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.json(users);
};

userFunctions.getUserById = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

userFunctions.addUser = async (req,res,next) => {
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
    user.save()
        .then(() => res.json({status: 'User saved'}))
        .catch((err) => {
            res.status(400);
            res.send('Bad request')}
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
    user.findByIdAndUpdate(req.params.id,{$set: user}, {new: true})
        .then(() => {
            res.status(200); 
            res.send("User updated")})
        .catch((err) => {
            res.status(400);
            res.send("Bad request");});
};


userFunctions.deleteUser = async (req, res, next) => {
    await user.findByIdAndRemove(req.params.id)
    .then(() => {
        res.status(200);
        res.json({status: 'User deleted'})})
    .catch(() => {
        res.status(500);
        res.send("Request cannot be fullfilled")});
};

module.exports = userFunctions;