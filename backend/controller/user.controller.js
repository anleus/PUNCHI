const User = require('../models/users');

const userFunctions = {};

userFunctions.getUsers = async (req, res, next) => {
    User.find()
};

userFunctions.addUser = async (req,res,next) => {
    console.log("INSIDE POST");
    const user = new User({
        nombre: 'Paco',
        apellidos: 'Paredes Borras',
        fechaNacimiento: Date.now(),
        email: 'pacopb98@gmail.com',
        localidad:'Moncada',
        provincia:'Valencia',
        domicilio: 'c/lepanto',
        telefono: '67123456',
        gestor:false,
        admin:true,
        nuss: 1234,
        deleted: false,
        username: 'PakitohWalls',
        password: 'PakitohWalls',
        becario: false
    })
    await user.save().catch((err) => {console.log(err)});
    res.json({status: 'User saved'});
};

userFunctions.deleteUser = async (req, res, next) => {
    await user.findByIdAndRemove(req.params.id);
    res.json({status: 'User deleted'});
};

module.exports = userFunctions;