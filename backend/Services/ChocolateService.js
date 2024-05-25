const { readJSON, writeJSON } = require('../utils/jsonHandler');
const { v4: uuidv4 } = require('uuid');

class ChocolateService {
  constructor() {
    this.filePath = './data/chocolates.json';
  }

  async getAllChocolates() {
    return await readJSON(this.filePath);
  }

  async getChocolateById(id) {
    const chocolates = await this.getAllChocolates();
    return chocolates.find(choc => choc.id === id);
  }

  async createChocolate(chocolateData) {
    const chocolates = await this.getAllChocolates();
    const newChocolate = { id: uuidv4(), ...chocolateData };
    chocolates.push(newChocolate);
    await writeJSON(this.filePath, chocolates);
    return newChocolate;
  }

  async updateChocolate(id, chocolateData) {
    const chocolates = await this.getAllChocolates();
    const index = chocolates.findIndex(choc => choc.id === id);
    if (index !== -1) {
      chocolates[index] = { ...chocolates[index], ...chocolateData };
      await writeJSON(this.filePath, chocolates);
      return chocolates[index];
    }
    return null;
  }

  async deleteChocolate(id) {
    const chocolates = await this.getAllChocolates();
    const updatedChocolates = chocolates.filter(choc => choc.id !== id);
    await writeJSON(this.filePath, updatedChocolates);
    return id;
  }
}

module.exports = new ChocolateService();