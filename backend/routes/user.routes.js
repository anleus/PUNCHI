const express = require('express');
const app = express();
const userFunctions = require('../controller/user.controller');
const router = express.Router();
const User = require('../models/users');
//routes
/*app.get('/user', (req, res, next) => res.json('Users'));
app.get('/user/:id',);
app.post('/user',userFunctions.addUser);
app.put('/user/:id');
app.delete('/user/:id', userFunctions.deleteUser);*/
router.get('/users',(req, res) => {
    res.send('holaaaaaaaa')
});

router.route('/users/:id').get((req, res) => {
    Users.findById(req.params.id, (err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

module.exports = router;
