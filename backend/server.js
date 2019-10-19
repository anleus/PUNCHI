const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./models/users');
const userRoutes = require('./routes/user.routes');
const connection = mongoose.connection;
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@clusterpunchi-sujlc.mongodb.net/PUNCHI?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
app.use(require('./routes/user.routes'));
app.use(require('./routes/jornada.routes'));
app.use(require('./routes/deparament.routes'));
app.get('/', (req, res) => res.send('Hello world'));
app.listen(4000, () => console.log('Express server running on port 4000'));