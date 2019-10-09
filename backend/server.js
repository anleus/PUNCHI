import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Users from './models/Users';
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@clusterpunchi-sujlc.mongodb.net/test?retryWrites=true&w=majority');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/users').get((req, res) => {
    Users.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

router.route('/users/:id').get((req, res) => {
    Users.findById(req.params.id, (err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

app.use('/', router);

app.get('/', (req, res) => res.send('Hello world'));
app.listen(4000, () => console.log('Express server running on port 4000'));