const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

/* Schema */
const RecordSchema = new mongoose.Schema({
  name: String,
  value: String
});

const Record = mongoose.model('Record', RecordSchema);

/* Mongo connection */
const mongoURI = 'mongodb://mongo:27017/mydb';

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    setTimeout(connectMongo, 5000);
  }
};

connectMongo();

/* Routes */
app.post('/records', async (req, res) => {
  try {
    const record = new Record(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get('/records', async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Server */
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
