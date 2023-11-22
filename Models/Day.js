const mongoose = require('mongoose');

// Define the Source schema
const DaySchema = new mongoose.Schema({
    Num: {
        type: Number,
        required: true,
      },

  Words: {
    type: Array,
    default: [], // Default value is an empty array
  },
  // You might want to add more validations or options for the Words field based on your needs
});

// Create the Source model
const Day = mongoose.model('Day', DaySchema);

module.exports = { Day };
