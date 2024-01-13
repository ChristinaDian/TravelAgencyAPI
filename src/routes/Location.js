const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/LocationController');

const locationController = new LocationController();

// GET all locations
router.get('/', (req, res) => {
    const locations = locationController.getAllLocations();
    res.json(locations);
});

// GET a specific location by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const location = locationController.getLocationById(id);

    if (location) {
        res.json(location);
    } else {
        res.status(404).json({ error: 'Location not found' });
    }
});

// POST a new location
router.post('/', (req, res) => {
    const newLocation = req.body;
    const createdLocation = locationController.createLocation(newLocation);
    res.status(201).json(createdLocation);
});

// PUT (update) a location by ID
router.put('/:id', (req, res) => {
    const locationId = parseInt(req.params.id);
    const updatedLocation = req.body;
    const result = locationController.updateLocation(locationId, updatedLocation);

    if (result.success) {
        res.json(result.location);
    } else {
        res.status(404).json({ error: 'Location not found' });
    }
});

// DELETE a location by ID
router.delete('/:id', (req, res) => {
    const locationId = parseInt(req.params.id);
    const result = locationController.deleteLocation(locationId);

    if (result.success) {
        res.json({ message: 'Location deleted successfully' });
    } else {
        res.status(404).json({ error: 'Location not found' });
    }
});

module.exports = router;
