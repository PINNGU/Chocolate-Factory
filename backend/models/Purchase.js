class Purchase {
    constructor(id, chocolates, factory, dateTime, price, customer, status) {
      this.id = id;            // Unique identifier
      this.chocolates = chocolates;  // Array of chocolates that were purchased
      this.factory = factory;  // Factory from which the chocolates were purchased
      this.dateTime = dateTime; // Date and time of the purchase
      this.price = price;      // Total price of the purchase
      this.customer = customer;  // Customer who made the purchase
      this.status = status;    // Status of the purchase (Obrada, Odobreno, Odbijeno, Otkazano)
    }
  }
  
  module.exports = Purchase;