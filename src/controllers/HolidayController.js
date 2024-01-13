class HolidayController {
    constructor() {
      this.holidays = [];
    }
  
    getAllHolidays() {
      return this.holidays;
    }
  
    getHolidayById(id) {
      return this.holidays.find((holiday) => holiday.id === id);
    }
  
    createHoliday(newHoliday) {
      const id = this.holidays.length + 1;
      const holiday = {
        id,
        title: newHoliday.title,
        startDate: newHoliday.startDate,
        duration: newHoliday.duration,
        price: newHoliday.price,
        freeSlots: newHoliday.freeSlots,
        location: {
          id: newHoliday.location.id,
          street: newHoliday.location.street,
          number: newHoliday.location.number,
          city: newHoliday.location.city,
          country: newHoliday.location.country,
        },
      };
      this.holidays.push(holiday);
      return holiday;
    }
  
    updateHoliday(id, updatedHoliday) {
      const index = this.holidays.findIndex((holiday) => holiday.id === id);
  
      if (index !== -1) {
        this.holidays[index] = {
          id,
          title: updatedHoliday.title,
          startDate: updatedHoliday.startDate,
          duration: updatedHoliday.duration,
          price: updatedHoliday.price,
          freeSlots: updatedHoliday.freeSlots,
          location: {
            id: updatedHoliday.location.id,
            street: updatedHoliday.location.street,
            number: updatedHoliday.location.number,
            city: updatedHoliday.location.city,
            country: updatedHoliday.location.country,
          },
        };
        return { success: true, holiday: this.holidays[index] };
      } else {
        return { success: false };
      }
    }
  
    deleteHoliday(id) {
      const index = this.holidays.findIndex((holiday) => holiday.id === id);
  
      if (index !== -1) {
        this.holidays.splice(index, 1);
        return { success: true };
      } else {
        return { success: false };
      }
    }
  }
  
  module.exports = HolidayController;
  