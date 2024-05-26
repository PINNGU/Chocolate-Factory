const { readJSONFile, writeJSONFile } = require('../utils/jsonHandler');
const Purchase = require('../models/Purchase');
const { v4: uuidv4 } = require('uuid');

const filePath = './data/purchases.json';

class PurchaseService {
  async getAllPurchases() {
    return await readJSONFile(filePath);
  }

  async getPurchaseById(id) {
    const purchases = await readJSONFile(filePath);
    return purchases.find(purchase => purchase.id === id);
  }

  async createPurchase(purchaseData) {
    const purchases = await readJSONFile(filePath);
    const newPurchase = new Purchase(
      uuidv4(),
      purchaseData.chocolates,
      purchaseData.factory,
      purchaseData.dateTime,
      purchaseData.price,
      purchaseData.customer,
      purchaseData.status
    );
    purchases.push(newPurchase);
    await writeJSONFile(filePath, purchases);
    return newPurchase;
  }

  async updatePurchase(id, updatedData) {
    const purchases = await readJSONFile(filePath);
    const index = purchases.findIndex(purchase => purchase.id === id);
    if (index === -1) {
      throw new Error('Purchase not found');
    }
    purchases[index] = { ...purchases[index], ...updatedData };
    await writeJSONFile(filePath, purchases);
    return purchases[index];
  }

  async deletePurchase(id) {
    const purchases = await readJSONFile(filePath);
    const updatedPurchases = purchases.filter(purchase => purchase.id !== id);
    await writeJSONFile(filePath, updatedPurchases);
    return { message: 'Purchase deleted successfully' };
  }
}

module.exports = new PurchaseService();