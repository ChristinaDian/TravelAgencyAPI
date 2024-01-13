const express = require('express');
const router = express.Router();
const HolidayController = require('../controllers/HolidayController');

const holidayController = new HolidayController();

// GET all holidays
router.get('/', (req, res) => {
  const holidays = holidayController.getAllHolidays();
  res.json(holidays);
});

// GET a specific holiday by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const holiday = holidayController.getHolidayById(id);

  if (holiday) {
    res.json(holiday);
  } else {
    res.status(404).json({ error: 'Holiday not found' });
  }
});

// POST a new holiday
router.post('/', (req, res) => {
  const newHoliday = req.body;
  const createdHoliday = holidayController.createHoliday(newHoliday);
  res.status(201).json(createdHoliday);
});

// PUT (update) a holiday by ID
router.put('/:id', (req, res) => {
  const holidayId = parseInt(req.params.id);
  const updatedHoliday = req.body;
  const result = holidayController.updateHoliday(holidayId, updatedHoliday);

  if (result.success) {
    res.json(result.holiday);
  } else {
    res.status(404).json({ error: 'Holiday not found' });
  }
});

// DELETE a holiday by ID
router.delete('/:id', (req, res) => {
  const holidayId = parseInt(req.params.id);
  const result = holidayController.deleteHoliday(holidayId);

  if (result.success) {
    res.json({ message: 'Holiday deleted successfully' });
  } else {
    res.status(404).json({ error: 'Holiday not found' });
  }
});

module.exports = router;
