const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller.js');

router.post('/userid', usersController.verifyUserAsync);
router.post('/login', usersController.loginUserAsync);
router.post('/register', usersController.registerUserAsync);
router.delete('/:userId', usersController.deleteUserAsync);
router.put('/:userId', usersController.updateUserAsync);
router.put('/pwd/:userId', usersController.updatePasswordAsync);
router.get('/:userId', usersController.getUserInformationAsync);

module.exports = router;