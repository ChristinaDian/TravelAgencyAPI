const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;
const databaseFile = 'src/data/db.json';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Load data from the database file
const loadData = () => {
  try {
    const data = fs.readFileSync(databaseFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading database file: ${error.message}`);
    return { holidays: [], locations: [], reservations: [] };
  }
};

let { holidays, locations, reservations } = loadData();

// Function to generate a unique ID for new items
const generateUniqueId = (items) => {
  const ids = items.map((item) => item.id);
  return Math.max(0, ...ids) + 1;
};

// Save data to the database file
const saveData = (data) => {
  try {
    fs.writeFileSync(databaseFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing to database file: ${error.message}`);
  }
};

// Routes
app.get('/holidays', (req, res) => {
  res.json(holidays);
});

app.get('/holidays/:id', (req, res) => {
  const holidayId = parseInt(req.params.id);
  const holiday = holidays.find((h) => h.id === holidayId);

  if (holiday) {
    res.json(holiday);
  } else {
    res.status(404).json({ error: 'Holiday not found' });
  }
});

app.post('/holidays', (req, res) => {
  const locationId = req.body.locationId; // Assuming you provide locationId in the request body
  const location = locations.find((loc) => loc.id === locationId);

  const newHoliday = {
    id: generateUniqueId(holidays),
    location,
    ...req.body,
  };

  holidays.push(newHoliday);
  saveData({ holidays, locations, reservations });
  res.status(201).json(newHoliday);
});

app.put('/holidays/:id', (req, res) => {
  const holidayId = parseInt(req.params.id);
  const updatedHoliday = req.body;
  const index = holidays.findIndex((holiday) => holiday.id === holidayId);

  if (index !== -1) {
    holidays[index] = { ...holidays[index], ...updatedHoliday };
    saveData({ holidays, locations, reservations });
    res.json(holidays[index]);
  } else {
    res.status(404).json({ error: 'Holiday not found' });
  }
});

app.delete('/holidays/:id', (req, res) => {
  const holidayId = parseInt(req.params.id);
  const index = holidays.findIndex((holiday) => holiday.id === holidayId);

  if (index !== -1) {
    holidays.splice(index, 1);
    saveData({ holidays, locations, reservations });
    res.json({ message: 'Holiday deleted successfully' });
  } else {
    res.status(404).json({ error: 'Holiday not found' });
  }
});

app.get('/locations', (req, res) => {
  res.json(locations);
});

app.get('/locations/:id', (req, res) => {
  const locationId = parseInt(req.params.id);
  const location = locations.find((loc) => loc.id === locationId);

  if (location) {
    res.json(location);
  } else {
    res.status(404).json({ error: 'Location not found' });
  }
});

app.post('/locations', (req, res) => {
  const newLocation = {
    id: generateUniqueId(locations),
    ...req.body,
  };
  locations.push(newLocation);
  saveData({ holidays, locations, reservations });
  res.status(201).json(newLocation);
});

app.put('/locations/:id', (req, res) => {
  const locationId = parseInt(req.params.id);
  const updatedLocation = req.body;
  const index = locations.findIndex((location) => location.id === locationId);

  if (index !== -1) {
    locations[index] = { ...locations[index], ...updatedLocation };
    saveData({ holidays, locations, reservations });
    res.json(locations[index]);
  } else {
    res.status(404).json({ error: 'Location not found' });
  }
});

app.delete('/locations/:id', (req, res) => {
  const locationId = parseInt(req.params.id);
  const index = locations.findIndex((location) => location.id === locationId);

  if (index !== -1) {
    locations.splice(index, 1);
    saveData({ holidays, locations, reservations });
    res.json({ message: 'Location deleted successfully' });
  } else {
    res.status(404).json({ error: 'Location not found' });
  }
});

app.get('/reservations', (req, res) => {
  res.json(reservations);
});

app.post('/reservations', (req, res) => {
  const newReservation = {
    id: generateUniqueId(reservations),
    ...req.body,
  };
  reservations.push(newReservation);
  saveData({ holidays, locations, reservations });
  res.status(201).json(newReservation);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
