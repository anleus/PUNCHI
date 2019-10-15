const express = require('express');
const app = express();
const userFunctions = require('../controller/user.controller');

//routes
app.get('/user', (req, res, next) => res.json('Users'));
app.get('/user/:id',);
app.post('/user',userFunctions.addUser);
app.put('/user/:id');
app.delete('/user/:id', userFunctions.deleteUser);

module.exports = app;
