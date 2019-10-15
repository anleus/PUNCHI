const express = require('express');
const userFunctions = require('../controller/user.controller');
const router = express.Router();
const User = require('../models/users');
//routes
router.get('/users', (req, res, next) => res.json('Users'));
router.get('/users/:id',);
router.post('/users',userFunctions.addUser);
router.put('/users/:id');
router.delete('/users/:id', userFunctions.deleteUser);

module.exports = router;
