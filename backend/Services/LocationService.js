const path = require('path');
const jsonHandler = require('../utils/jsonHandler');
const { v4: uuidv4 } = require('uuid');
const Location = require('../models/Location.js');

const locationFilePath = path.join(__dirname, '../data/locations.json');

class LocationService {
  static async getAllLocations() {
    return await jsonHandler.readJSON(locationFilePath);
  }

  static async getLocationById(locationId) {
    const locations = await this.getAllLocations();
    return locations.find(location => location.id === locationId);
  }

  static async createLocation(locationData) {
    try {
        const locations = await this.getAllLocations();
        console.log(1);
        console.log(locationData);

        const newLocation = new Location(
            locationData.id,
            locationData.longitude,
            locationData.latitude,
            locationData.address
        );
        console.log(2);

        locations.push(newLocation);
        console.log(3);

        await jsonHandler.writeJSON(locationFilePath, locations);
        console.log(4);

        return newLocation;
    } catch (error) {
        console.error('Error creating location:', error);
        throw new Error('Error creating location');
    }
}


  static async updateLocation(locationId, locationData) {
    console.log(1);
    const locations = await this.getAllLocations();
    console.log(2);
    const locationIndex = locations.findIndex(location => location.id === locationId);
    console.log(3);
    if (locationIndex !== -1) {
      const updatedLocation = {
        ...locations[locationIndex],
        ...locationData
      };
      locations[locationIndex] = updatedLocation;
      await jsonHandler.writeJSON(locationFilePath, locations);
      return locations[locationIndex];
    }
    else{
        console.log(5);
    }
    console.log(4);
    
  }

  static async deleteLocation(locationId) {
    const locations = await this.getAllLocations();
    const updatedLocations = locations.filter(location => location.id !== locationId);
    await jsonHandler.writeJSON(locationFilePath, updatedLocations);
    return locationId;
  }
}

module.exports = LocationService;
