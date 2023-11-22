const express = require('express');
const { Day } = require('../Models/Day.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allDays = await Day.find({});
    res.status(200).json({ message: 'Days retrieved successfully', data: allDays });
  } catch (error) {
    console.error('Error retrieving Days:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const newDate = new Day(data);
    await newDate.save();
    res.status(201).json({ message: 'Day created successfully', data: newDate });
  } catch (error) {
    console.error('Error saving Day:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Middleware for searching a specific day
const searchDayMiddleware = async (req, res, next) => {
  try {
    // Extract the day parameter from the URL
    const dayNum = req.params.dayNum;

    // Perform the search operation using the dayNum
    const foundDay = await Day.findOne({ Num: dayNum });

    // Attach the found day to the request object for later use in the route handler
    req.foundDay = foundDay;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error searching for day:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Route to handle the search request
router.get('/:dayNum', searchDayMiddleware, (req, res) => {
  // Access the found day from the request object
  const foundDay = req.foundDay;

  if (!foundDay) {
    return res.status(404).json({ message: 'Day not found' });
  }

  // Return the found day in the response
  res.status(200).json({ day: foundDay });
});

module.exports = router;

  