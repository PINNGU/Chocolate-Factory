const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const UserController = require('../controllers/UserController');

router.post('/login', UserController.loginUser); // Route for user login

router.get('/',  UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.post('/',  UserController.createUser);
router.put('/:userId',  UserController.updateUser);
router.delete('/:userId', authenticate, UserController.deleteUser);

module.exports = router;

