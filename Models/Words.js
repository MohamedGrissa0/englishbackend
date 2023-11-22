const mongoose = require('mongoose');

// Define the Source schema
const WordsSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
      },
      Num: {
        type: Number,
        required: true,
      },


      pnom: {
        type: String,
        required: true,
      },
  // You might want to add more validations or options for the Words field based on your needs
});

// Create the Source model
const Word = mongoose.model('Word', WordsSchema);

module.exports = { Word };
