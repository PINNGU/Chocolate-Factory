const path = require('path');
const jsonHandler = require('../utils/jsonHandler');
const { v4: uuidv4 } = require('uuid');
const Location = require('../models/Location.js');

const locationFilePath = path.join(__dirname, '../data/locations.json');

class LocationService {
  static async getAllLocations() {
    return await jsonHandler.readJsonFile(locationFilePath);
  }

  static async getLocationById(locationId) {
    const locations = await this.getAllLocations();
    return locations.find(location => location.id === locationId);
  }

  static async createLocation(locationData) {
    const locations = await this.getAllLocations();
    const newLocation = new Location(
      locationData.longitude,
      locationData.latitude,
      locationData.adress
    );
    locations.push(newLocation);
    await jsonHandler.writeJsonFile(locationFilePath, locations);
    return newLocation;
  }

  static async updateLocation(locationId, locationData) {
    const locations = await this.getAllLocations();
    const locationIndex = locations.findIndex(location => location.id === locationId);
    if (locationIndex !== -1) {
      const updatedLocation = {
        ...locations[locationIndex],
        ...locationData
      };
      locations[locationIndex] = updatedLocation;
      await jsonHandler.writeJsonFile(locationFilePath, locations);
      return locations[locationIndex];
    }
    throw new Error('Location not found');
  }

  static async deleteLocation(locationId) {
    const locations = await this.getAllLocations();
    const updatedLocations = locations.filter(location => location.id !== locationId);
    await jsonHandler.writeJsonFile(locationFilePath, updatedLocations);
    return locationId;
  }
}

module.exports = LocationService;
