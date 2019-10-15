const user = require('../models/user');

const userFunctions = {};

userFunctions.addUser = async (req,res,next) => {
    const user = new User({
        nombre: 'Paco',
        apellidos: 'Paredes Borras',
        fechaNacimiento: '25/06/1998',
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
    await user.save();
    res.json({status: 'User saved'});
};

userFunctions.deleteUser = async (req, res, next) => {
    await user.findByIdAndRemove(req.params.id);
    res.json({status: 'User deleted'});
};

module.exports = userFunctions;