class ReservationController {
    constructor() {
        this.reservations = [];
    }

    getAllReservations() {
        return this.reservations;
    }

    getReservationById(id) {
        return this.reservations.find(reservation => reservation.id === id);
    }

    createReservation(newReservation) {
        const id = this.reservations.length + 1;
        const reservation = { id, ...newReservation };
        this.reservations.push(reservation);
        return reservation;
    }

    updateReservation(id, updatedReservation) {
        const index = this.reservations.findIndex(reservation => reservation.id === id);

        if (index !== -1) {
            this.reservations[index] = { id, ...updatedReservation };
            return { success: true, reservation: this.reservations[index] };
        } else {
            return { success: false };
        }
    }

    deleteReservation(id) {
        const index = this.reservations.findIndex(reservation => reservation.id === id);

        if (index !== -1) {
            this.reservations.splice(index, 1);
            return { success: true };
        } else {
            return { success: false };
        }
    }
}

module.exports = ReservationController;
