const express = require('express');
const router = express.Router();
const factoryController = require('../controllers/FactoryController');

router.get('/', factoryController.getAllFactories);
router.get('/:factoryId', factoryController.getFactoryById);
router.post('/', factoryController.createFactory);
router.put('/:factoryId', factoryController.updateFactory);
router.delete('/:factoryId', factoryController.deleteFactory);
router.post('/:factoryId/chocolates', factoryController.addChocolatesToFactory);

module.exports = router;
