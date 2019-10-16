const express = require('express');
const userFunctions = require('../controller/user.controller');
const router = express.Router();
const User = require('../models/users');
//routes
router.get('/users', userFunctions.getUsers);
router.get('/users/:id', userFunctions.getUserById);
router.post('/users',userFunctions.addUser);
router.put('/users/:id', userFunctions.updateUser);
router.delete('/users/:id', userFunctions.deleteUser);

module.exports = router;
