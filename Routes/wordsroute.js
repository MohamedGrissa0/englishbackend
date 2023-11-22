const express = require('express');
const { Word } = require('../Models/Words.js');
const { Day } = require('../Models/Day.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nom, Num, pnom } = req.body;
    const newWord = new Word({ nom, Num, pnom });
    await newWord.save();

    // Find the day document and update it
    const day = await Day.findOne({ Num: Num });
    if (day) {
      day.Words.push(newWord);
      await day.save();
      res.status(201).json({ message: 'Word added successfully', word: newWord });
    } else {
      res.status(404).json({ message: 'Day not found' });
    }
  } catch (error) {
    console.error('Error adding word:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

 
module.exports = router;
