const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients.controller.js');

router.post('/register', clientsController.registerClientAsync);
router.post('/byclient/search', clientsController.searchClientsAsync);
router.put('/:clientId', clientsController.updateClientAsync);
router.delete('/:clientId', clientsController.deleteClientAsync);
router.delete('/deleteall/:userId', clientsController.deleteClientsForUserAsync);
router.get('/:clientId', clientsController.getClientAsync);
router.get('/byuser/:userId', clientsController.getUserClientsAsync);


module.exports = router;