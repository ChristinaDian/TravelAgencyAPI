class LocationController{
    constructor() {
        this.locations = [];
    }

    getAllLocations() {
        return this.locations;
    }

    getLocationById(id) {
        return this.locations.find(location => location.id === id);
    }

    createLocation(newLocation) {
        const id = this.locations.length + 1;
        const location = { id, ...newLocation };
        this.locations.push(location);
        return location;
    }

    updateLocation(id, updatedLocation) {
        const index = this.locations.findIndex(location => location.id === id);

        if (index !== -1) {
            this.locations[index] = { id, ...updatedLocation };
            return { success: true, location: this.locations[index] };
        } else {
            return { success: false };
        }
    }

    deleteLocation(id) {
        const index = this.locations.findIndex(location => location.id === id);

        if (index !== -1) {
            this.locations.splice(index, 1);
            return { success: true };
        } else {
            return { success: false };
        }
    }
}

module.exports = LocationController;
