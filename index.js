const express = require('express');
const app = express();
const Dayroute = require('./Routes/Dayrouter');
const Wordroute = require('./Routes/wordsroute');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



mongoose
  .connect("mongodb+srv://medgrissa111:medgrissa111@cluster0.jvuakj7.mongodb.net/")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(cors());

app.use(express.json());

app.use('/day', Dayroute);
app.use('/word', Wordroute);

app.get('/', (req, res) => {
  console.log('first');
  res.send('Hello World!'); 
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
