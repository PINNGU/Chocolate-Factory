const path = require('path');
const jsonHandler = require('../utils/jsonHandler');
const { v4: uuidv4 } = require('uuid');
const Factory = require('../models/Factory');
const Location = require('../models/Location');

const factoryFilePath = path.join(__dirname, '../data/factories.json');

class FactoryService {
  static async getAllFactories() {
    return await jsonHandler.readJsonFile(factoryFilePath);
  }

  static async getFactoryById(factoryId) {
    const factories = await this.getAllFactories();
    return factories.find(factory => factory.id === factoryId);
  }

  static async createFactory(factoryData) {
    const factories = await this.getAllFactories();
    const location = new Location(
      factoryData.location.longitude,
      factoryData.location.latitude,
      factoryData.location.address
    );
    const newFactory = new Factory(
      factoryData.name,
      factoryData.chocolates,
      factoryData.workingHours,
      factoryData.status,
      location,
      factoryData.logo,
      factoryData.rating
    );
    factories.push(newFactory);
    await jsonHandler.writeJsonFile(factoryFilePath, factories);
    return newFactory;
  }

  static async updateFactory(factoryId, factoryData) {
    const factories = await this.getAllFactories();
    const factoryIndex = factories.findIndex(factory => factory.id === factoryId);
    if (factoryIndex !== -1) {
      const updatedFactory = {
        ...factories[factoryIndex],
        ...factoryData,
        location: factoryData.location ? new Location(
          factoryData.location.longitude,
          factoryData.location.latitude,
          factoryData.location.address
        ) : factories[factoryIndex].location
      };
      factories[factoryIndex] = updatedFactory;
      await jsonHandler.writeJsonFile(factoryFilePath, factories);
      return factories[factoryIndex];
    }
    throw new Error('Factory not found');
  }

  static async deleteFactory(factoryId) {
    const factories = await this.getAllFactories();
    const updatedFactories = factories.filter(factory => factory.id !== factoryId);
    await jsonHandler.writeJsonFile(factoryFilePath, updatedFactories);
    return factoryId;
  }

  static async addChocolates(factoryId, newChocolates) {
    const factories = await this.getAllFactories();
    const factory = factories.find(factory => factory.id === factoryId);
    if (!factory) {
      throw new Error('Factory not found');
    }
    factory.chocolates.push(...newChocolates);
    await jsonHandler.writeJsonFile(factoryFilePath, factories);
    return factory;
  }
}

module.exports = FactoryService;
