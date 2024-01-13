const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');

const reservationController = new ReservationController();

// GET all reservations
router.get('/', (req, res) => {
    const reservations = reservationController.getAllReservations();
    res.json(reservations);
});

// GET a specific reservation by ID
router.get('/:id', (req, res) => {
    const reservationId = parseInt(req.params.id);
    const reservation = reservationController.getReservationById(reservationId);

    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).json({ error: 'Reservation not found' });
    }
});

// POST a new reservation
router.post('/', (req, res) => {
    const newReservation = req.body;
    const createdReservation = reservationController.createReservation(newReservation);
    res.status(201).json(createdReservation);
});

// PUT (update) a reservation by ID
router.put('/:id', (req, res) => {
    const reservationId = parseInt(req.params.id);
    const updatedReservation = req.body;
    const result = reservationController.updateReservation(reservationId, updatedReservation);

    if (result.success) {
        res.json(result.reservation);
    } else {
        res.status(404).json({ error: 'Reservation not found' });
    }
});

// DELETE a reservation by ID
router.delete('/:id', (req, res) => {
    const reservationId = parseInt(req.params.id);
    const result = reservationController.deleteReservation(reservationId);

    if (result.success) {
        res.json({ message: 'Reservation deleted successfully' });
    } else {
        res.status(404).json({ error: 'Reservation not found' });
    }
});

module.exports = router;
