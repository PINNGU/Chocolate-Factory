const path = require('path');
const jsonHandler = require('../utils/jsonHandler');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const CustomerType = require('../models/CustomerType');

const userFilePath = path.join(__dirname, '../data/users.json');

class UserService {
  static async getAllUsers() {
    return await jsonHandler.readJsonFile(userFilePath);
  }

  static async getUserById(userId) {
    const users = await this.getAllUsers();
    return users.find(user => user.id === userId);
  }

  static async createUser(userData) {
    const users = await this.getAllUsers();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const customerType = new CustomerType(
      userData.customerType.name,
      userData.customerType.discountPercentage,
      userData.customerType.pointsRequiredForDiscount
    );
    const newUser = new User(
      userData.username,
      hashedPassword,
      userData.name,
      userData.surname,
      userData.gender,
      userData.dateOfBirth,
      userData.role,
      userData.purchases,
      userData.cart,
      userData.chocolateFactory,
      userData.points,
      customerType
    );
    users.push(newUser);
    await jsonHandler.writeJsonFile(userFilePath, users);
    return newUser;
  }

  static async updateUser(userId, userData) {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      const updatedUser = {
        ...users[userIndex],
        ...userData,
        role: userData.role ? new User().Role[userData.role] : users[userIndex].role,
        gender: userData.gender ? new User().Gender[userData.gender] : users[userIndex].gender,
        customerType: userData.customerType ? new CustomerType(
          userData.customerType.name,
          userData.customerType.discountPercentage,
          userData.customerType.pointsRequiredForDiscount
        ) : users[userIndex].customerType
      };
      users[userIndex] = updatedUser;
      await jsonHandler.writeJsonFile(userFilePath, users);
      return users[userIndex];
    }
    throw new Error('User not found');
  }

  static async deleteUser(userId) {
    const users = await this.getAllUsers();
    const updatedUsers = users.filter(user => user.id !== userId);
    await jsonHandler.writeJsonFile(userFilePath, updatedUsers);
    return userId;
  }
}

module.exports = UserService;
