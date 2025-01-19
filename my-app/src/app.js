const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://mongo:27017/text_analyzer');

app.use(bodyParser.json());
app.use('/api', routes);

app.get('/api/texts/words/:id', async (req, res) => {

});
